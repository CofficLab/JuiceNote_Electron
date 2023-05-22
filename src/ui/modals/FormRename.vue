<template>
  <div class="modal modal-open" v-show="visible">
    <Transition name="bounce" v-if="visible">
      <div class="modal-box">
        <p class="mb-6">
          为<span class="text-lg font-bold">「{{ node!.title }}」</span>重命名
        </p>

        <input
          id="rename-node-form-title"
          ref="title"
          type="text"
          v-model="title"
          placeholder="输入新的标题"
          autofocus
          class="input-bordered input-primary input w-full max-w-xs bg-yellow-300/10"
          @keyup.enter="submit"
        />
        <div class="modal-action">
          <label for="my-modal" class="btn" v-on:click="setUnVisible">取消</label>
          <label for="my-modal" class="btn" v-on:click="submit">确定</label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";
import { Node } from "../entities/Node";
import { useToastStore } from "../stores/ToastStore";

let visible = ref(false);
let node = ref<Node>();
let title = node.title;

const setUnVisible = () => (visible.value = false);
const setVisible = function (e: CustomEvent) {
  visible.value = true;
  node.value = e.detail.node;
  nextTick(() => document.querySelector<HTMLDivElement>("#rename-node-form-title")!.focus());
};
const submit = () => {
  node.value!.title = title;
  node.value?.update().then(() => {
    useToastStore().set('标题更新成功');
    setUnVisible();
  });
  
};

onMounted(function () {
  window.addEventListener("show-rename-modal", setVisible as EventListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("show-rename-modal", setVisible as EventListener);
});
</script>

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
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
