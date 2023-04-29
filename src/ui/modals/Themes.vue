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
      <div class="max-w-96 dropdown-content rounded-box h-1/2 overflow-y-auto bg-primary/30 p-4 text-base-content shadow-2xl backdrop-blur-sm backdrop-filter">
        <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
          <button
            :data-theme="theme"
            class="overflow-hidden rounded-lg text-left outline-base-content"
            :class="{ 'ring-4': current == index }"
            @click="setTheme(index)"
            v-for="(theme, index) in themes"
          >
            <div class="flex cursor-pointer flex-row items-center justify-center gap-4 border-b border-base-200 bg-base-100 py-2 font-sans text-base-content">
              <IconRight v-if="current == index"></IconRight>
              <div class="font-bold">{{ theme }}</div>
            </div>
            <div :data-theme="t" class="w-full cursor-pointer bg-base-100 font-sans" v-for="t in [theme, theme + '-dark']">
              <div class="grid grid-cols-5 grid-rows-3">
                <div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                  <div class="flex flex-grow flex-row gap-2 text-sm font-bold text-base-content">
                    <div class="bg-base-100 p-2">快易知</div>
                    <div class="bg-base-200 p-2">简于形</div>
                    <div class="bg-base-300 p-2">强于心</div>
                  </div>
                  <div class="flex h-full flex-shrink-0 flex-wrap gap-2">
                    <div class="flex aspect-square w-5 items-center justify-center rounded bg-primary lg:w-6">
                      <div class="text-sm font-bold text-primary-content">A</div>
                    </div>
                    <div class="flex aspect-square w-5 items-center justify-center rounded bg-secondary lg:w-6">
                      <div class="text-sm font-bold text-secondary-content">A</div>
                    </div>
                    <div class="flex aspect-square w-5 items-center justify-center rounded bg-accent lg:w-6">
                      <div class="text-sm font-bold text-accent-content">A</div>
                    </div>
                    <div class="flex aspect-square w-5 items-center justify-center rounded bg-neutral lg:w-6">
                      <div class="text-sm font-bold text-neutral-content">A</div>
                    </div>
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
import IconRight from "../icons/IconCorrect.vue";
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
</style>
