<template>
  <div>
    <div title="Change Theme" class="dropdown dropdown-end">
      <div tabindex="0" class="btn-ghost btn-sm btn gap-1 normal-case">
        <IconTheme></IconTheme>
        <svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <div class="themes-list">
        <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
          <button class="overflow-hidden rounded-lg text-left outline-base-content" @click="setTheme(theme)" v-for="theme in themes">
            <div :data-theme="theme" class="w-full cursor-pointer bg-base-100 font-sans text-base-content">
              <div class="grid grid-cols-5 grid-rows-3">
                <div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                  <IconRight v-if="themeName == theme"></IconRight>
                  <div class="flex-grow text-sm font-bold">{{ theme }}</div>
                  <div class="flex h-full flex-shrink-0 flex-wrap gap-1">
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
    </div>
  </div>
</template>

<script setup>
import IconTheme from "../icons/theme.vue";
import IconRight from "../icons/right.vue";
import { ref } from "vue";
import Preload from "../entities/Preload";

const themes = Preload.getThemes();
const themeName = ref(themes[0]);

const setTheme = (name) => {
  themeName.value = name;
  dispatchEvent(new CustomEvent("set-theme", { detail: name }));
};
</script>

<style scoped lang="postcss">
ul li {
  @apply border border-base-content/20 outline-2 outline-offset-2 outline-base-content hover:border-base-content/40;
}
.themes-list {
  @apply dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 bg-opacity-30 text-base-content shadow-2xl backdrop-blur backdrop-filter;
}
</style>
