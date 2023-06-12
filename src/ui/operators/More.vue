<template>
  <div>
    <div class="dropdown-end dropdown-hover dropdown">
      <label tabindex="0">
        <IconMore></IconMore>
      </label>
      <ul tabindex="0"
        class="dropdown-content w-48 rounded z-50 flex translate-x-4 flex-col bg-primary/90 py-4 shadow-2xl backdrop-blur-3xl">
        <li v-if="!isShop">
          <Delete :node="current"></Delete>
        </li>
        <li v-if="!isShop">
          <CreateChild></CreateChild>
        </li>
        <li v-if="!isShop">
          <Edit></Edit>
        </li>
        <li v-if="!isShop">
          <Visible :node="current"></Visible>
        </li>
        <li v-if="!isShop">
          <SetChapter :node="current"></SetChapter>
        </li>
        <li v-if="!isShop">
          <SetPage :node="current"></SetPage>
        </li>
        <li v-if="!isShop">
          <Visible :node="current"></Visible>
        </li>
        <li v-if="!isShop">
          <Rename :node="current"></Rename>
        </li>
        <li>
          <Export :node="current"></Export>
        </li>
        <li v-if="!isShop">
          <Import :node="current"></Import>
        </li>
        <li>
            <Upload :node="current"></Upload>
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
import { useNodeStore } from "../stores/NodeStore";
import IconMore from "../icons/IconMore.vue";
import SetChapter from "./SetChapter.vue";
import SetPage from "./SetPage.vue";
import Rename from "./Rename.vue";
import Export from "./Export.vue";
import Import from "./Import.vue";
import Upload from "./Upload.vue";
import { useRoute } from "vue-router";

const current = computed(() => useNodeStore().current);
const isShop = computed(() => useRoute().params.tree =='shop')
</script>

<style scoped lang="postcss">ul {
  li {
    @apply flex justify-start btn btn-ghost rounded-none;

    >div {
      @apply rounded-sm flex flex-row gap-2 items-center w-full
    }
  }
}</style>
