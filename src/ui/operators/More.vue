<template>
  <div>
    <div class="dropdown-end dropdown-hover dropdown">
      <label tabindex="0">
        <ChevronDoubleDown></ChevronDoubleDown>
      </label>
      <ul tabindex="0" class="dropdown-content rounded-box z-50 flex translate-x-4 flex-col bg-base-200/90 py-4 shadow-2xl backdrop-blur-sm backdrop-filter">
        <li v-if="isRouteLesson">
          <Delete :showText="false" :node="current" class="btn-ghost btn rounded-sm"></Delete>
        </li>
        <li v-if="isRouteLesson">
          <CreateChild :showText="false" class="btn-ghost btn rounded-sm"></CreateChild>
        </li>
        <li>
          <Edit :showText="false" class="btn-ghost btn rounded-sm"></Edit>
        </li>
        <li v-if="isRouteLesson">
          <Copy :showText="false" class="btn-ghost btn rounded-sm"></Copy>
        </li>
        <li v-if="isDev">
          <Commit :showText="false" class="btn-ghost btn rounded-sm"></Commit>
        </li>
        <li v-if="isRouteLesson">
          <Visible :showText="false" :node="book" class="btn-ghost btn rounded-sm"></Visible>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ChevronDoubleDown from "../icons/chevron-double-down.svg";
import Copy from "./Copy.vue";
import Delete from "./Delete.vue";
import Commit from "./Commit.vue";
import Edit from "./Edit.vue";
import CreateChild from "./Add.vue";
import Visible from "./Visible.vue";
import  NodeApi  from "../api/NodeApi";
import Preload from "../api/Preload";
import { useCurrentNodeStore } from "../stores/NodeStore";

const route = useRoute();
const book = computed(() => NodeApi.find(parseInt(route.params.id.toString())).getBook());
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
const isDev = Preload.isDev();
const current = computed(() => useCurrentNodeStore().current);
</script>

<style scoped lang="postcss">
ul {
  li {
    @apply flex justify-center;
  }
}
</style>
