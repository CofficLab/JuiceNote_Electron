<template>
  <div>
    <div class="dropdown-end dropdown-hover dropdown">
      <label tabindex="0">
          <ChevronDoubleDown></ChevronDoubleDown>
      </label>
      <ul tabindex="0" class="dropdown-content z-50 flex w-8 flex-col gap-4 rounded-sm bg-base-100 py-4 shadow">
        <li v-if="isRouteLesson">
          <Delete :showText="false" class="btn-ghost btn-xs btn rounded-sm"></Delete>
        </li>
        <li v-if="isRouteLesson">
          <CreateChild :showText="false" class="btn-ghost btn-xs btn  rounded-sm"></CreateChild>
        </li>
        <li>
          <Edit :showText="false" class="btn-ghost btn-xs btn rounded-sm"></Edit>
        </li>
        <li v-if="isRouteLesson">
          <Copy :showText="false" class="btn-ghost btn-xs btn rounded-sm"></Copy>
        </li>
        <li>
          <Commit :showText="false" class="btn-ghost btn-xs btn rounded-sm"></Commit>
        </li>
        <li v-if="isRouteLesson">
          <Visible :showText="false" :node="book" class="btn-ghost btn-xs btn rounded-sm"></Visible>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import ChevronDoubleDown from "../../assets/icons/chevron-double-down.svg";
import Copy from "./Copy.vue";
import Delete from "./Delete.vue";
import Commit from "./Commit.vue";
import Edit from "./Edit.vue";
import CreateChild from "./Add.vue";
import Visible from "./Visible.vue";
import { Node } from "../../models/Node";

const route = useRoute();
const book = computed(() => Node.find(parseInt(route.params.id.toString())).getBook());
const isRouteLesson = computed(() => route.name && route.name.startsWith("lessons"));
</script>

<style scoped lang="postcss">
ul li {
  @apply flex justify-center;
}
</style>
