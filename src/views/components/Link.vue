<template>
  <div
    :id="'node-' + node.id"
    v-bind:data-id="node.id"
    v-on:contextmenu="showRightMenu"
    v-bind:class="{
      ring: shouldShowRightMenu,
      'active tab-active': shouldActive(node.id),
    }"
  >
    <router-link :to="'/lessons/' + node.id">
      <slot></slot>
    </router-link>

    <!-- 右键菜单 -->
    <RightMenu v-if="shouldShowRightMenu" v-bind:event="rightClickEvent">
      <li>
        <Rename :node="node"></Rename>
      </li>
      <li>
        <Edit :bookNode="node"></Edit>
      </li>
      <li>
        <ToTab :node="node"></ToTab>
      </li>
      <li>
        <Delete :bookNode="node"></Delete>
      </li>
      <li>
        <CreateChild :node="node"></CreateChild>
      </li>
      <li>
        <Visible :node="node"></Visible>
      </li>
    </RightMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import ToTab from "../operators/ToTab.vue";
import RightMenu from "./RightMenu.vue";
import RightMenuController from "../../controllers/RightMenuController";
import { Node } from "../../models/Node";
import CreateChild from "../operators/CreateChild.vue";
import Visible from "../operators/Visible.vue";

export default defineComponent({
  props: { node: { type: Node, required: true } },
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
    current() {
      return Node.find(this.$route.params.id);
    },
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
    showRightMenu(event) {
      this.rightClickEvent = event;
      RightMenuController.shouldShow = true;
    },
  },
  components: { Rename, RightMenu, Edit, Delete, ToTab, CreateChild, Visible },
});
</script>
