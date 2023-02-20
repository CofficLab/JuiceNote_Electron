<template>
  <div
    class="justify-center h-full flex flex-grow p-0 breadcrumbs overflow-visible bg-gradient-to-r from-sky-200/60 via-sky-200/90 to-sky-200/60 dark:from-sky-800/80 dark:via-sky-900 dark:to-sky-800/80"
    v-bind:class="{ 'text-yellow-500': inEditMode }"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown dropdown-top flex justify-center" v-if="breadcrumb.siblings().length > 0">
          <label tabindex="0" class="self-center">{{ breadcrumb.name }}</label>
          <ul
            tabindex="0"
            class="dropdown-content shadow p-2 gap-2 bg-cyan-900/80 rounded-box w-52 h-96 overflow-y-scroll"
          >
            <Children :list="breadcrumb.getParent().getChildren()"></Children>
          </ul>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="rounded-none self-center">{{ breadcrumb.name }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import EditModeController from "../controllers/EditModeController";
import BookNode from "../entities/BookNode";
import Children from "./Children.vue";

export default defineComponent({
  data() {
    let emptyNode = new BookNode();
    return {
      dragging: false,
      dragged: emptyNode,
      hovered: emptyNode,
      index: 0,
    };
  },
  computed: {
    breadcrumbs: () => RouteController.getBreadcrumbs(),
    inEditMode: () => EditModeController.edit_mode,
  },
  components: { Children },
});
</script>
