<template>
  <Transition name="slide-fade">
    <ul ref="menus" v-if="visible" :x="x" :y="y" class="right-menus" v-bind:style="{ left: x + 'px', top: y + 'px' }">
      <li><Rename :node="node"></Rename></li>
      <li><Edit :bookNode="node"></Edit></li>
      <li><ToTab :node="node"></ToTab></li>
      <li><Delete :bookNode="node"></Delete></li>
      <li><CreateChild :node="node"></CreateChild></li>
      <li><Visible :node="node"></Visible></li>
    </ul>
  </Transition>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import ToTab from "../operators/ToTab.vue";
import CreateChild from "../operators/Add.vue";
import Visible from "../operators/Visible.vue";
import { Node } from "../entities/Node";

let x = ref(0);
let y = ref(0);
let node = ref<Node>();
let visible = ref(false);

const handleClick = () => {
  visible.value = false;
};

const handleEvent = (e) => {
  console.log("检测到右键事件", e.detail);
  (x.value = e.detail.x), (y.value = e.detail.y);
  node.value = e.detail.node;
  visible.value = true;
};

onMounted(() => {
  window.addEventListener("click", handleClick);
  window.addEventListener("show-right-menus", handleEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClick);
  window.removeEventListener("show-right-menus", handleEvent);
});
</script>

<style lang="postcss">
.right-menus {
  @apply fixed z-50 rounded-md bg-gray-900 bg-opacity-40 p-2 shadow-2xl ring-1 ring-gray-300/30 backdrop-blur backdrop-filter !important;

  svg {
    @apply mr-2 inline-block h-4 !important;
  }

  li {
    @apply flex h-8 list-none items-center justify-start justify-items-center rounded p-2 text-xs text-yellow-900 hover:cursor-pointer hover:bg-green-800/40 !important;
  }
}
</style>

<style lang="postcss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
