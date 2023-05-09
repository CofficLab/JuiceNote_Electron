<template>
  <!-- 新建节点的弹层 -->
  <div class="modal modal-open" v-if="visible">
    <Transition name="bounce">
      <div class="modal-box">
        <label for="my-modal-3" @click="setUnVisible" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
        <p class="mb-6">
          为<span class="text-lg font-bold">「{{ node?.title }}」</span>添加节点
        </p>
        <input id="add-node-form-title" autofocus type="text" v-model="title" placeholder="输入标题" class="input-bordered input-primary input w-full max-w-xs" @keyup.enter="submit(false)" />
        <div class="modal-action justify-start">
          <label for="my-modal" class="btn" v-on:click="submit(false)" v-if="!node?.isPage">创建页面</label>
          <label for="my-modal" class="btn" v-on:click="submit(true)" v-if="!node?.isPage">创建章节</label>

          <label for="my-modal" class="btn" v-on:click="submit(false, true)">创建兄弟页面</label>
          <label for="my-modal" class="btn" v-on:click="submit(true, true)">创建兄弟章节</label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from "vue";

import { useRouter } from "vue-router";
import { Node } from "../entities/Node";

let router = useRouter();
let title = "";
let visible = ref(false);
let node = ref<Node>();

const setUnVisible = () => (visible.value = false);
const setVisible = function (e: CustomEvent) {
  visible.value = true;
  node.value = e.detail.node;
  nextTick(function () {
    document.querySelector<HTMLDivElement>("#add-node-form-title")!.focus();
  });
};

const submit = function (isChapter: boolean, createSibling = false) {
  if (node == null || node.value == null) return;
  let parent = createSibling ? node.value.getParent() : node.value;
  let id = isChapter ? parent.createChildChapter(title) : parent.createChildPage(title, `<h1>${title}</h1>`);

  // console.log("创建新节点后返回的ID", id);
  router.push({ name: "nodes.show", params: { id: id.toString() } });
  setUnVisible();
};

onMounted(function () {
  window.addEventListener("show-add-form", setVisible as EventListener);
});

onBeforeUnmount(function () {
  window.removeEventListener("show-add-form", setVisible as EventListener);
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
