<template>
  <div class="modal modal-open" @keydown.esc="toggleVisible" v-if="visible">
    <Transition name="bounce">
      <div class="modal-box bg-primary/30 text-primary-content backdrop-blur-sm backdrop-filter">
        <div class="form-control flex justify-center">
          <h1>出现错误 <span><a href="/">回到首页</a></span></h1>
          <ul class="mx-auto mt-4 w-full gap-4">
            <li v-for="exception in exceptions">{{ exception }}</li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Preload from "../api/Preload";

let visible = ref(false);

const toggleVisible = () => (visible.value = !visible.value) && focus();

const exceptions = ref([])

Preload.listen("exception", (event, e) => {
  console.log('渲染进程监听到异常信息',e)
  exceptions.value = e
  visible.value = true
});

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
