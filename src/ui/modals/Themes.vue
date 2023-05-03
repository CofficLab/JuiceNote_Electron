<template>
  <div
    ref="target"
    class="modal modal-open"
    tabindex="0"
    @keyup.enter="toggleVisible"
    @keydown.esc="toggleVisible"
    @click="handleClickModal"
    @keydown.arrow-up="handelArrowUp"
    @keydown.arrow-down="handelArrowDown"
    v-if="visible"
  >
    <Transition name="bounce">
      <ul
        id="theme-list"
        tabindex="0"
        class="max-w-96 rounded-box flex h-2/3 cursor-pointer flex-col gap-4 overflow-y-scroll bg-primary/30 p-8 shadow-2xl backdrop-blur-sm backdrop-filter focus:outline-none"
      >
        <li :data-theme="theme" class="outline-base-content" :class="{ 'ring-4': current == index }" @click="setTheme(index)" v-for="(theme, index) in themes">
          <div class="flex flex-row items-center justify-center gap-4 border-b border-base-200 bg-base-100 py-2 font-sans text-base-content">
            <IconRight v-if="current == index"></IconRight>
            <div class="font-bold">{{ theme }}</div>
          </div>
          <div :data-theme="t" class="w-full bg-base-100 font-sans" v-for="t in [theme, theme + '-dark']">
            <div class="flex flex-row items-center gap-4 p-4">
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
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import Preload from "../api/Preload";
import Themes from "../entities/Themes";
import IconRight from "../icons/IconCorrect.vue";
import { ref, nextTick } from "vue";

const themes = Themes;
const themeName = ref(themes[0]);
const visible = ref(false);
const current = ref(0);
const target = ref();

const setTheme = (index) => {
  themeName.value = themes[index];
  current.value = index;
  dispatchEvent(new CustomEvent("set-theme", { detail: themeName.value }));

  document.querySelector(`[data-theme=${themes[index]}]`)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const toggleVisible = () => {
  visible.value = !visible.value;
  nextTick(() => target.value?.focus());
};

const activate = (index: number) => {
  current.value = Math.min(themes.length - 1, Math.max(0, index));
  setTheme(current.value);
};

const handelArrowUp = (e) => {
  e.preventDefault();
  activate(current.value - 1);
};

const handelArrowDown = (e) => {
  e.preventDefault();
  activate(current.value + 1);
};

const handleClickModal = (e) => {
  e.preventDefault();
  document.querySelector<HTMLDivElement>("#theme-list")!.focus();
};

Preload.listen("toggle-theme-setting", toggleVisible);
</script>
