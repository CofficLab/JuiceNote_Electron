<template>
  <!-- 重命名的弹层 -->
  <div class="modal modal-open">
    <Transition name="bounce">
      <div class="modal-box">
        <p class="mb-6">
          为<span class="text-lg font-bold">「{{ node.title }}」</span>重命名
        </p>

        <input id="rename-node-form-title" ref="title" type="text" v-model="title" placeholder="输入新的标题" autofocus class="input-bordered input-primary input w-full max-w-xs bg-yellow-300/10" @keyup.enter="submit" />
        <div class="modal-action">
          <label for="my-modal" class="btn" v-on:click="hide">取消</label>
          <label for="my-modal" class="btn" v-on:click="submit">确定</label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import NodeController from "../../controllers/NodeController";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";
import {onMounted} from "vue"
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  node: {
    type: Node,
    required: true,
  },
});

let title = "";

const hide = () => {
  router.push({
    name: "lessons.show",
    params: { id: route.params.id },
  });
};

const submit = () => {
  ToastController.set(NodeController.updateTitle(props.node, title));
  hide();
};

onMounted(function() {
  document.querySelector('#rename-node-form-title')?.focus()
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
