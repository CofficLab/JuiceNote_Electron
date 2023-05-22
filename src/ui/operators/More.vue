<template>
  <div>
    <div class="dropdown-end dropdown-hover dropdown">
      <label tabindex="0">
        <IconMore></IconMore>
      </label>
      <ul tabindex="0"
        class="dropdown-content w-48 rounded z-50 flex translate-x-4 flex-col bg-primary/50 py-4 shadow-2xl backdrop-blur-sm backdrop-filter">
        <li>
          <Delete :node="current"></Delete>
        </li>
        <li>
          <CreateChild></CreateChild>
        </li>
        <li>
          <Edit></Edit>
        </li>
        <li>
          <Visible :node="current"></Visible>
        </li>
        <li>
          <SetChapter :node="current"></SetChapter>
        </li>
        <li>
          <SetPage :node="current"></SetPage>
        </li>
        <li>
          <Visible :node="current"></Visible>
        </li>
        <li>
          <Rename :node="current"></Rename>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Delete from "./Delete.vue";
import Edit from "./Edit.vue";
import CreateChild from "./Add.vue";
import Visible from "./Visible.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import IconMore from "../icons/IconMore.vue";
import SetChapter from "./SetChapter.vue";
import SetPage from "./SetPage.vue";
import Rename from "./Rename.vue";

const current = computed(() => useCurrentNodeStore().current);
</script>

<style scoped lang="postcss">ul {
  li {
    @apply flex justify-start btn btn-ghost rounded-none;

    >div {
      @apply rounded-sm flex flex-row gap-2 items-center w-full
    }
  }
}</style>
