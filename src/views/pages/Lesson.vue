<template>
  <LessonLayout>
    <div class="flex h-full w-full flex-col items-center">
      <div class="fixed top-12 z-50 w-full bg-green-200/90" :class="{ 'top-24': editable }"><NodeTab :current="node"></NodeTab></div>

      <div @contextmenu="showRightMenu" class="z-40 w-full">
        <Editor :node="node" :saveCallback="save" :editable="editable"></Editor>
      </div>

      <!-- 右键菜单 -->
      <RightMenu :event="rightClickEvent">
        <Edit :node="node"></Edit>
        <Rename :node="node"></Rename>
        <Add :node="node"></Add>
        <Copy :bookNode="node"></Copy>
        <Prev :node="node"></Prev>
        <Next :node="node"></Next>
        <Delete></Delete>
      </RightMenu>

      <!-- 弹层 -->
      <FormAdd :node="node" v-if="adding"></FormAdd>
      <FormRename :node="node" v-if="renaming"></FormRename>
    </div>
  </LessonLayout>
</template>

<script setup>
import NodeTab from "../components/NodeTab.vue";
import RightMenu from "../components/RightMenu.vue";
import Add from "../operators/Add.vue";
import Copy from "../operators/Copy.vue";
import Edit from "../operators/Edit.vue";
import Rename from "../operators/Rename.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import Delete from "../operators/Delete.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import Editor from "../components/Editor.vue";
import LessonLayout from "../layouts/LessonLayout.vue";
import { Node } from "../../models/Node";
import { ref, computed } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();

const editable = computed(() => route.name == "lessons.edit");

let adding = route.query.adding != undefined;
let renaming = route.query.renaming != undefined;

let rightClickEvent = ref(null);
let node = Node.find(route.params.id);

let showRightMenu = function (event) {
  rightClickEvent.value = event;
};
let save = function (content) {
  if (content != node.content) {
    console.log("保存节点", node.id, "的内容", content.substring(0, 20) + "...");
    node.updateContent(content);
  }
};

onBeforeRouteUpdate((to, from) => {
  console.log("pages.lesson，路由发生了变化，处理lesson的展示");

  node = Node.find(to.params.id);
  adding = to.query.adding != undefined;
  renaming = to.query.renaming != undefined;

  if (to.hash.length > 0) {
    // 获取带有锚点的元素
    var target = document.querySelector(to.hash);
    console.log("滚动到锚点", target);

    // 如果有锚点并且目标元素存在，则滚动到该元素
    if (window.location.hash && target) {
      document.querySelector("main").scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
});
</script>

<style lang="postcss">
#toolbar-container {
  @apply sticky top-0 z-40 flex w-full flex-row items-center justify-center gap-2 bg-yellow-300/30 shadow-2xl;
}

.ProseMirror {
  @apply mb-24 px-2 pb-56 pt-1;
}

table {
  @apply rounded-none;

  td,
  th {
    @apply border border-gray-700 p-2 !important;
  }

  p {
    @apply my-0 !important;
  }
}
</style>
