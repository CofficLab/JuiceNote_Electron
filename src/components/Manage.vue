<template>
  <div class="dropdown dropdown-top z-50 w-full">
    <label tabindex="0" class="btn my-auto w-full pb-3 text-center align-middle rounded-none">
      <Cog></Cog>
    </label>
    <ul tabindex="0" class="dropdown-content shadow-3xl">
      <div class="btn w-48 rounded-none" v-on:click="toggleEditMode">{{ edit_mode ? "返回" : "编辑" }}</div>
      <div class="btn w-48 rounded-none" v-on:click="deleteNav">删除</div>
      <div class="btn w-48 rounded-none" v-on:click="showForm">增加章节</div>
      <div class="btn w-48 rounded-none" v-on:click="commit">Git提交</div>
    </ul>
  </div>

  <!-- 增加章节的弹层 -->
  <div class="modal z-50" v-bind:class="showModal ? 'modal-open' : ''">
    <div class="modal-box">
      <input
        ref="title"
        type="text"
        autofocus
        v-model="form.title"
        placeholder="输入标题"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <div class="modal-action">
        <label for="my-modal" class="btn" v-on:click="hideForm">取消</label>
        <label for="my-modal" class="btn" v-on:click="submit">提交</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Cog from "../icons/cog.vue";
import node from "../models/node";

export default defineComponent({
  data() {
    return {
      showModal: false,
      form: {
        title: "",
      },
    };
  },
  methods: {
    showForm() {
      this.showModal = true;
      this.$nextTick(function () {
        (this.$refs.title as any).focus();
      });
    },
    hideForm() {
      this.showModal = false;
    },
    submit() {
      let currentNode = store.current(this.$route.path);
      let currentParent = currentNode.getParent();

      if (currentParent !== null) {
        let node = store.createChild(currentParent, this.form.title);
        this.showModal = false;
        this.form.title = "";
        console.log("created", node);
        this.$router.push(node.link);
      } else {
        alert("父节点不存在，无法创建");
      }
    },
    toggleEditMode: function () {
      console.log("toggle edit mode");
      if (this.$route.name === "editor") {
        this.$router.push(this.$route.path.replace("editor", "article"));
      } else {
        this.$router.push(this.$route.path.replace("article", "editor"));
      }
    },
    deleteNav: function () {
      console.log("parent of current navigator", this.current.getParent());
      this.$router.push(this.current.getParent().link);
      store.root.delete(this.current.id);
    },
    commit: function () {
      let exec = require("child_process").exec;
      exec("git add -A", function (error: any, stdout: any, stderr: any) {
        if (stdout) console.log(stdout);
        if (error) return console.error(stderr);

        exec("git commit -m '提交文档变动'", function (error: any, stdout: any, stderr: any) {
          if (stdout) console.log(stdout);
          if (error) return console.error(stderr);

          exec("git push", function (error: any, stdout: any, stderr: any) {
            if (stdout) console.log(stdout);
            if (error) console.error(stderr);
          });
        });
      });
    },
  },
  computed: {
    edit_mode(): boolean {
      return this.$route.name === "editor";
    },
    current(): node {
      return store.current(this.$route.path);
    },
  },
  components: { Cog },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-none mx-auto prose z-10;
  ul {
    @apply list-none pl-1 fixed z-10;

    a {
      @apply no-underline z-0;
    }
  }
}
</style>
