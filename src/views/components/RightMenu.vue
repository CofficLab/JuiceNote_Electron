<template>
  <Transition name="slide-fade">
    <div ref="menus" v-show="isVisible" class="right-menus" v-bind:style="{ left: x + 'px', top: y + 'px' }">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
import { defineProps, watch, ref } from "vue";

const props = defineProps({
  event: {
    type: Object,
    require: false,
  },
});

let isVisible = ref(false);
let x = 0;
let y = 0;

document.addEventListener("click", () => {
  console.log("右键菜单检测到click事件");
  isVisible.value = false;
});

watch(
  () => props.event,
  (newValue) => {
    x = newValue.x;
    y = newValue.y;
    isVisible.value = true;
  }
);
</script>

<style lang="postcss">
.right-menus {
  @apply fixed z-50 w-56 rounded-md bg-base-300 shadow-2xl ring-1 ring-gray-300/30 !important;

  svg {
    @apply mr-4 inline-block h-6 !important;
  }
  div {
    @apply flex h-10 items-center justify-start justify-items-center p-4 text-yellow-900 hover:cursor-pointer hover:bg-base-200 !important;
  }
}
</style>

<style scoped>
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
