<template>
  <div class="flex h-full w-full flex-col items-center overflow-scroll overscroll-none">
    <NodeTab :current="current"></NodeTab>

    <div @contextmenu.prevent="showRightMenu">
      <Editor :node="current" :editable="false"></Editor>
    </div>

    <RightMenu :event="rightClickEvent">
      <Copy :bookNode="current"></Copy>
      <Prev :node="current" :current="current"></Prev>
      <Next :node="current"></Next>
    </RightMenu>
  </div>
</template>

<script setup>
import Editor from "../components/Editor.vue";
import RightMenu from "../components/RightMenu.vue";
import Copy from "../operators/Copy.vue";
import Prev from "../operators/Prev.vue";
import Next from "../operators/Next.vue";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import NodeTab from "../components/NodeTab.vue";

const route = useRoute();

let rightClickEvent = ref(null);
let current = Node.find(route.params.id);

let showRightMenu = function (event) {
  rightClickEvent.value = event;
};

onBeforeRouteUpdate((to, from) => {
  console.log("路由发生了变化，处理lesson的展示", from.fullPath, to.fullPath);

  // 更新当前节点
  current = NodeController.getNodeById(to.params.id);

  // 如果有锚点并且目标元素存在，则滚动到该元素
  if (to.hash.length > 0) {
    var target = document.querySelector(to.hash);
    if (window.location.hash && target) {
      document.querySelector("#editor-container").scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  }
});
</script>
