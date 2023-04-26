<template>
  <div>
    <div class="dropdown-hover dropdown-end dropdown">
      <label tabindex="0">
        <ChevronDoubleDown></ChevronDoubleDown>
      </label>
      <ul tabindex="0" class="shadow-3xl dropdown-content z-50 flex translate-x-4 flex-col rounded-sm bg-base-100 shadow-green-600">
        <li v-if="isRouteLesson">
          <Delete :showText="false" class="btn-ghost btn rounded-sm"></Delete>
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
        <li>
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
ul li {
  @apply flex justify-center;
}
</style>
