<template>
  <div
    v-bind:id="href"
    v-bind:href="href"
    v-on:contextmenu="showRightMenu"
    v-on:click="go"
    v-bind:class="{ ring: rightMenu, 'active tab-active': shouldActive(href) }"
  >
    <slot></slot>

    <!-- 右键菜单 -->
    <ul
      class="z-50 w-56 rounded-md bg-green-500/60 py-2 shadow-2xl ring-1 ring-gray-400"
      v-if="rightMenu"
      v-bind:style="{ left: rightMenuX + 'px', top: rightMenuY + 'px', position: 'fixed' }"
    >
      <li><a @click="showRenameModal = true">重命名</a></li>
      <li><a @click="edit">编辑</a></li>
      <li><a @click="deleteBookNode">删除</a></li>
    </ul>

    <!-- 重命名的弹层 -->
    <div class="modal-open modal" v-show="showRenameModal">
      <Transition name="bounce">
        <div class="modal-box" v-if="showRenameModal">
          <input
            ref="title"
            type="text"
            v-model="title"
            placeholder="输入标题"
            class="input-bordered input-primary input w-full max-w-xs bg-yellow-400"
            @keyup.enter="submit"
          />
          <div class="modal-action">
            <label for="my-modal" class="btn" v-on:click="showRenameModal = false">取消</label>
            <label for="my-modal" class="btn" v-on:click="submit">确定</label>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";
import BookNode from "../entities/BookNode";
import Id from "../entities/Id";
import Rename from "./Rename.vue";

export default defineComponent({
  props: ["href"],
  data() {
    return {
      rightMenu: false,
      rightMenuX: 0,
      rightMenuY: 0,
      title: "",
      showRenameModal: false,
    };
  },
  computed: {
    current() {
      let path = Id.idToPath(this.href);
      return new BookNode(path);
    },
  },
  methods: {
    shouldActive: function (id: string) {
      let current = RouteController.getCurrentPage();
      let parent = current.getParent();
      if (parent.isTab() && id == parent.id) {
        return true;
      }
      return RouteController.getCurrentPage().id == id;
    },
    go: function () {
      this.active = true;
      RouteController.goto(this.href);
    },
    showRightMenu(event) {
      this.rightMenuX = event.clientX;
      this.rightMenuY = event.clientY;
      this.rightMenu = true;
    },
    edit() {
      RouteController.editable = true;
      this.rightMenu = false;
    },
    deleteBookNode() {
      ToastController.set(RouteController.delete(this.href));
      this.rightMenu = false;
    },
    submit() {
      let newNode = this.current.rename(this.title);
      console.log(newNode.id);
      RouteController.goto(newNode.id);
      this.showRenameModal = false;
    },
  },
  mounted() {
    document.addEventListener("click", () => {
      this.rightMenu = false;
    });
    document.addEventListener("contextmenu", (event) => {
      let target = event.target;
      if (target.getAttribute("id") != this.href) {
        this.rightMenu = false;
      }
    });
    this.title = this.current.name;
  },
  components: { Rename },
});
</script>
