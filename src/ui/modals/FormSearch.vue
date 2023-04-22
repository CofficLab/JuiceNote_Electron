<template>
  <!-- 搜索的弹层 -->
  <div class="modal modal-open" @keydown.arrow-up="activate(current - 1)" @keydown.arrow-down="activate(current + 1)" @click="focus" v-if="visible">
    <Transition name="bounce">
      <div class="modal-box">
        <div class="form-control flex justify-center">
          <div class="flex w-full rounded-none">
            <input id="search-form-title" type="text" v-model="keyword" placeholder="输入关键词" autofocus class="input-primary input w-full" @keyup="submit" @keyup.enter="goto" />
          </div>
          <ul class="mx-auto mt-4 w-full gap-4 bg-base-100">
            <li
              @click="goto"
              class="flex cursor-pointer items-center justify-between rounded-lg p-2"
              v-for="(node, index) in nodes"
              @mouseenter="activate(index)"
              :class="{ 'bg-base-300': current == index }"
            >
              <span>{{ node.title }}</span>
              <span class="badge-info badge">
                {{ node.isBook ? "图书" : "" }}
                {{ node.isChapter ? "章节" : "" }}
                {{ node.isPage ? "页面" : "" }}
              </span>
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
import Node from "../entities/Node";

const router = useRouter();
let keyword = "";
let nodes = ref<Node[]>([]);
let current = ref(0);
let visible = ref(false)

const focus = () => nextTick(()=>document.querySelector<HTMLDivElement>("#search-form-title")?.focus())
const toggleVisible = () => (visible.value = !visible.value) && focus()
const activate = (index: number) => current.value = Math.min(nodes.value.length - 1, Math.max(0, index));
const goto = () => {
  router.push({ name: "lessons.show", params: { id: nodes.value[current.value].id } });
  toggleVisible()
};
const submit = (e:KeyboardEvent) => {
  if (e.key == "ArrowUp" || e.key == "ArrowDown") {
    return;
  }

  if (keyword.length == 0) {
    nodes.value = [];
  } else {
    console.log("提交了搜索", keyword);
    nodes.value = Node.search(keyword);
  }
};

window.addEventListener('channel', (e) => {
  console.log('监听到channel事件',e)
})

window.addEventListener('show-search', () => {
  toggleVisible()
})
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
