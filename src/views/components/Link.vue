<template>
  <div
    :id="'node-' + id"
    v-bind:data-id="id"
    v-on:contextmenu="showRightMenu"
    v-on:click="go"
    v-bind:class="{ ring: shouldShowRightMenu, 'active tab-active': shouldActive(id) }"
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
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import RightMenu from "./RightMenu.vue";
import RightMenuController from "../../controllers/RightMenuController";
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";

export default defineComponent({
  props: { id: { type: Number, required: true }, current: { type: Node, required: true } },
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
    shouldShowRightMenu() {
      return this.rightClickEvent && RightMenuController.shouldShow;
    },
  },
  methods: {
    shouldActive: function (id: number) {
      return this.current.getParents().some((parent) => {
        return parent.id == id;
      });
    },
    go: function () {
      if (this.shouldShowRightMenu) return false;
      this.active = true;
      NodeController.setCurrentPage(this.id);
    },
    showRightMenu(event) {
      this.rightClickEvent = event;
      RightMenuController.shouldShow = true;
    },
  },
  components: { Rename, RightMenu, Edit, Delete },
});
</script>
