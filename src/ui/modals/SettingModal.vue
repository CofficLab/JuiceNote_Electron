<template>
  <div class="modal modal-open" @keydown.esc="toggleVisible" v-if="visible">
    <Transition name="bounce">
      <div class="modal-box w-2/3 max-w-2xl relative p-0 h-96 bg-primary/50 backdrop-blur">
        <div class="flex flex-row h-full">
          <ul class="menu bg-base-300/50 w-16 h-full">
            <li><a :class="{ 'active': tab === '数据' }" @click="setTab('数据')">数据</a></li>
            <li><a :class="{ 'active': tab === '版本' }" @click="setTab('版本')">版本</a></li>
          </ul>

          <div class="flex flex-col h-full flex-grow gap-4 p-2 pr-4 py-10 overflow-scroll">
            <!-- 数据设置 -->
            <SettingData v-if="tab === '数据'"></SettingData>

            <!-- 其他设置 -->
            <SettingAbout v-show="tab === '版本'"></SettingAbout>

            <!-- 关闭的按钮 -->
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-1 top-1"
              @click="toggleVisible">✕</label>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
import Preload from "../api/Preload";
import componentLogger from "../log/componentLogger";
import SettingData from '../components/SettingData.vue'
import SettingAbout from '../components/SettingAbout.vue'

const tab = ref("数据");


let visible = ref(false);

const setTab = (t: string) => {
  tab.value = t;
}
const focus = () => nextTick(() => document.querySelector<HTMLDivElement>("#search-form-title")?.focus());
const toggleVisible = () => (visible.value = !visible.value) && focus();

window.addEventListener("channel", (e) => {
  componentLogger.info("监听到channel事件", e);
});

Preload.listen("toggle-setting", toggleVisible);
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
