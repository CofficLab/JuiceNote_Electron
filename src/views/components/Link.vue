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
      <li><Rename :node="target"></Rename></li>
      <li><Edit :bookNode="node"></Edit></li>
      <li><ToTab :node="node"></ToTab></li>
      <li><Delete :bookNode="node"></Delete></li>
      <li><CreateChild :node="node"></CreateChild></li>
    </RightMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import ToTab from "../operators/ToTab.vue";
import RightMenu from "./RightMenu.vue";
import RightMenuController from "../../controllers/RightMenuController";
import { Node } from "../../models/Node";
import NodeController from "../../controllers/NodeController";
import CreateChild from "../operators/CreateChild.vue";

export default defineComponent({
  props: { id: { type: Number, required: true }, node: { type: Node, required: true } },
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
    target() {
      return NodeController.getNodeById(this.id);
    },
    current: () => NodeController.getCurrentPage(),
  },
  methods: {
    shouldActive: function (id: number) {
      if (this.node.isChapter && !this.node.isTab) return false;

      return (
        this.current.getParents().some((parent) => {
          return parent.id == id;
        }) || this.current.id == id
      );
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
  components: { Rename, RightMenu, Edit, Delete, ToTab, CreateChild },
});
</script>
