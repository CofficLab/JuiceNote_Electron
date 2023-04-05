<template>
  <div
    :id="'node-' + node.id"
    v-bind:data-id="node.id"
    v-on:contextmenu="showRightMenu"
    v-bind:class="{
      'active tab-active': shouldActive(node.id),
    }"
    @click="go"
  >
    <div>
      <slot></slot>
    </div>

    <!-- 右键菜单 -->
    <RightMenu :event="rightClickEvent">
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

<script setup>
import { computed, defineProps, ref } from "vue";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import ToTab from "../operators/ToTab.vue";
import RightMenu from "./RightMenu.vue";
import { Node } from "../../models/Node";
import CreateChild from "../operators/CreateChild.vue";
import Visible from "../operators/Visible.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  node: {
    type: Node,
    required: true,
  },
});

const current = computed(() => {
  return Node.find(parseInt(route.params.id.toString()));
});

let rightClickEvent = ref(null);

const shouldActive = function (id) {
  if (props.node.isChapter && !props.node.isTab) return false;

  return (
    current.value.getParents().some((parent) => {
      return parent.id == id;
    }) || current.value.id == id
  );
};

const showRightMenu = function (event) {
  event.preventDefault();

  rightClickEvent.value = event;
};

const go = function () {
  if (rightClickEvent) return;
  router.push("/lessons/" + props.node.id + "/show");
};
</script>
