<template>
  <div>
    <div class="dropdown-end dropdown-hover dropdown">
      <label tabindex="0">
        <IconType></IconType>
      </label>
      <ul tabindex="0"
        class="dropdown-content rounded-box z-50 flex translate-x-4 flex-col bg-base-200/50 p-4 shadow-2xl backdrop-blur-sm backdrop-filter">
        <li class="hover:bg-base-300 p-2 cursor-pointer">
          <SetChapter :node="current" class="flex flex-row w-56 gap-2"></SetChapter>
        </li>
        <li class="hover:bg-base-300 p-2 cursor-pointer">
            <SetPage :node="current" class="flex flex-row w-56 gap-2"></SetPage>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNodeStore } from "../stores/NodeStore";
import IconType from "../icons/IconType.vue";
import SetChapter from "../operators/SetChapter.vue"
import SetPage from "./SetPage.vue";

const current = computed(() => useNodeStore().current);
</script>

<style scoped lang="postcss">
ul {
  li {
    @apply flex justify-center;
  }
}
</style>
