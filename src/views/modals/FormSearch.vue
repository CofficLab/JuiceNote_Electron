<template>
  <!-- 搜索的弹层 -->
  <div class="modal-open modal">
    <Transition name="bounce">
      <div class="modal-box">
        <div class="form-control flex justify-center">
          <div class="flex w-full rounded-none">
            <input id="search-form-title" type="text" v-model="keyword" placeholder="输入关键词" autofocus class="input-primary input input-lg w-full" @keyup="submit" @keyup.enter="goto" />
          </div>
          <ul class="menu mx-auto mt-4 w-full bg-base-100">
            <li v-for="node in nodes">
              <a @click="goto(node.id)">
                {{ node.isBook ? "[图书] " : "" }}
                {{ node.isChapter ? "[章节] " : "" }}
                {{ node.isPage ? "[页面] " : "" }}
                {{ node.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Node } from "../../models/Node";
import Link from "../components/Link.vue";
import { useRouter } from "vue-router";

const router = useRouter();
let keyword = "";
let nodes = ref<Node[]>([]);

const submit = () => {
  if (keyword.length == 0) {
    nodes.value = [];
  } else {
    console.log("提交了搜索", keyword);
    nodes.value = Node.search(keyword);
  }
};

const goto = (id) => {
  if (id == undefined) {
    id = nodes.value[0].id;
  }

  console.log("跳转到", id);
  router.push({ name: "lessons.show", params: { id: id } });
};

onMounted(function () {
  document.querySelector("#search-form-title")?.focus();
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
