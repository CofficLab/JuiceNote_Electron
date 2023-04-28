<template>
  <div
    ref="target"
    tabindex="0"
    class="modal modal-open"
    @keyup.enter="toggleVisible"
    @keydown.esc="toggleVisible"
    @keydown.arrow-up="activate(current - 1)"
    @keydown.arrow-down="activate(current + 1)"
    v-if="visible"
  >
    <Transition name="bounce">
      <div class="themes-list">
        <div class="flex w-full rounded-none">
          <input type="hidden" placeholder="输入关键词" autofocus class="w-full input-primary input" />
        </div>
        <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
          <button class="theme-btn" :class="{ 'ring-4': current == index }" @click="setTheme(index)" v-for="(theme, index) in themes">
            <div :data-theme="theme" class="w-full font-sans cursor-pointer bg-base-100 text-base-content">
              <div class="grid grid-cols-5 grid-rows-3">
                <div class="flex items-center col-span-5 row-span-3 row-start-1 gap-2 px-4 py-3">
                  <IconRight v-if="current == index"></IconRight>
                  <div class="flex-grow text-sm font-bold">{{ theme }}</div>
                  <div class="flex flex-wrap flex-shrink-0 h-full gap-1">
                    <div class="w-2 rounded bg-primary"></div>
                    <div class="w-2 rounded bg-secondary"></div>
                    <div class="w-2 rounded bg-accent"></div>
                    <div class="w-2 rounded bg-neutral"></div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import IconRight from "../icons/right.vue";
import { ref, nextTick } from "vue";
import Preload from "../entities/Preload";

const themes = Preload.getThemes();
const themeName = ref(themes[0]);
const visible = ref(false);
const current = ref(0);
const target = ref();

const setTheme = (index) => {
  themeName.value = themes[index];
  current.value = index;
  dispatchEvent(new CustomEvent("set-theme", { detail: themeName.value }));
};

const toggleVisible = () => {
  console.log("切换主题配置的可见性");
  visible.value = !visible.value;
  nextTick(() => target.value?.focus());
};

const activate = (index: number) => {
  current.value = Math.min(themes.length - 1, Math.max(0, index));
  console.log("当前激活的索引是", current.value);
  setTheme(current.value);
};

Preload.listen("toggle-theme-setting", toggleVisible);
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

ul li {
  @apply border border-base-content/20 outline-2 outline-offset-2 outline-base-content hover:border-base-content/40;
}
.themes-list {
  @apply dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-primary bg-opacity-30 text-base-content shadow-2xl backdrop-blur-sm backdrop-filter;
}

.theme-btn {
  @apply overflow-hidden rounded-lg text-left outline-base-content;
}
</style>
