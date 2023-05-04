<template>
  <!-- 搜索的弹层 -->
  <div class="modal modal-open" @keydown.esc="toggleVisible" @keydown.arrow-up="activate(current - 1)" @keydown.arrow-down="activate(current + 1)" @click="focus" v-if="visible">
    <Transition name="bounce">
      <div class="modal-box bg-primary/30 text-primary-content backdrop-blur-sm backdrop-filter">
        <div class="form-control flex justify-center">
          <div class="flex w-full rounded-none">
            <input id="search-form-title" type="text" v-model="keyword" placeholder="输入关键词" autofocus class="input-primary input w-full" @keyup="submit" @keyup.enter="goto" />
          </div>
          <ul class="mx-auto mt-4 w-full gap-4">
            <li
              @click="goto"
              class="flex cursor-pointer items-center justify-between rounded-lg p-2"
              v-for="(node, index) in nodes"
              @mouseenter="activate(index)"
              :class="{ 'bg-base-300': current == index }"
            >
              <div class="flex flex-row gap-4">
                <IconBook></IconBook>
                {{ getBook(node).title }}

                <IconChapter v-if="node.isChapter"></IconChapter>
                <IconPage v-if="node.isPage"></IconPage>
                <span v-if="!node.isBook">{{ node.title }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { Node } from "../entities/Node";
import Preload from "../api/Preload";
import IconBook from "../icons/IconBook.vue";
import IconChapter from "../icons/IconChapter.vue";
import IconPage from "../icons/IconPage.vue";
import { NodeApi } from "../api/NodeApi";

const router = useRouter();
let keyword = "";
let nodes = ref<Node[]>([]);
let current = ref(0);
let visible = ref(false);

const getBook = function (node: Node) {
  return Preload.ipc.sendSync("getBook", node.id);
};
const focus = () => nextTick(() => document.querySelector<HTMLDivElement>("#search-form-title")?.focus());
const toggleVisible = () => (visible.value = !visible.value) && focus();
const activate = (index: number) => (current.value = Math.min(nodes.value.length - 1, Math.max(0, index)));
const goto = () => {
  router.push({ name: "local.lessons.show", params: { id: nodes.value[current.value].id } });
  toggleVisible();
};
const submit = (e: KeyboardEvent) => {
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    return;
  }

  if (keyword.length == 0) {
    nodes.value = [];
  } else {
    console.log("提交了搜索", keyword);
    nodes.value = NodeApi.search(keyword);
  }
};

window.addEventListener("channel", (e) => {
  console.log("监听到channel事件", e);
});

Preload.listen("toggle-search", toggleVisible);
</script>

<style scoped lang="postcss">
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
</style>
