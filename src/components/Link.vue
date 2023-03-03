<template>
  <div
    v-bind:id="href"
    v-bind:href="href"
    v-on:contextmenu="showRightMenu"
    v-on:click="go"
    v-bind:class="{ ring: shouldShowRightMenu, 'active tab-active': shouldActive(href) }"
  >
    <slot></slot>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" v-bind:event="rightClickEvent">
      <li><Rename :bookNode="current"></Rename></li>
      <li><Edit :bookNode="current"></Edit></li>
      <li><Delete :bookNode="current"></Delete></li>
    </RightMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import BookNode from "../entities/BookNode";
import Id from "../entities/Id";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import RightMenu from "./RightMenu.vue";
import RightMenuController from "../controllers/RightMenuController";

export default defineComponent({
  props: ["href"],
  data() {
    return {
      rightClickEvent: null,
    };
  },
  mounted: function () {
    document.addEventListener("click", () => {
      // console.log("检测到click事件，隐藏我的右键菜单");
      this.rightClickEvent = null;
    });
  },
  computed: {
    current() {
      let path = Id.idToPath(this.href);
      return new BookNode(path);
    },
    shouldShowRightMenu() {
      return this.rightClickEvent && RightMenuController.shouldShow;
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
      if (this.shouldShowRightMenu) return false;
      this.active = true;
      RouteController.goto(this.href);
    },
    showRightMenu(event) {
      this.rightClickEvent = event;
      RightMenuController.shouldShow = true;
    },
  },
  components: { Rename, RightMenu, Edit, Delete },
});
</script>
