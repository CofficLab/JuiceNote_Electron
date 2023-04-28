<template>
  <div>
    <div class="dropdown-hover dropdown dropdown-end">
      <label tabindex="0">
        <ChevronDoubleDown></ChevronDoubleDown>
      </label>
      <ul tabindex="0">
        <li v-if="isRouteLesson">
          <Delete :showText="false" class="rounded-sm btn-ghost btn"></Delete>
        </li>
        <li v-if="isRouteLesson">
          <CreateChild :showText="false" class="rounded-sm btn-ghost btn"></CreateChild>
        </li>
        <li>
          <Edit :showText="false" class="rounded-sm btn-ghost btn"></Edit>
        </li>
        <li v-if="isRouteLesson">
          <Copy :showText="false" class="rounded-sm btn-ghost btn"></Copy>
        </li>
        <li>
          <Commit :showText="false" class="rounded-sm btn-ghost btn"></Commit>
        </li>
        <li v-if="isRouteLesson">
          <Visible :showText="false" :node="book" class="rounded-sm btn-ghost btn"></Visible>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ChevronDoubleDown from "../assets/icons/chevron-double-down.svg";
import Copy from "./Copy.vue";
import Delete from "./Delete.vue";
import Commit from "./Commit.vue";
import Edit from "./Edit.vue";
import CreateChild from "./Add.vue";
import Visible from "./Visible.vue";
import Node from "../entities/Node";

const route = useRoute();
const book = computed(() => Node.find(parseInt(route.params.id.toString())).getBook());
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
const editable = computed(() => route.name == "lessons.edit");
</script>

<style scoped lang="postcss">
ul {
  @apply dropdown-content rounded-box z-50 flex translate-x-4 flex-col bg-info/30 bg-opacity-50 py-4 shadow-2xl backdrop-blur backdrop-filter;

  li {
    @apply flex justify-center;
  }
}
</style>
