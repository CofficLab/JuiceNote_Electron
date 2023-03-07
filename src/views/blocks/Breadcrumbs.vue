<template>
  <div
    class="breadcrumbs flex h-full flex-grow justify-start overflow-visible"
    v-bind:class="{ 'text-yellow-500': inEditMode }"
  >
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in current?.getParents()" class="flex justify-center">
        <div
          class="dropdown-bottom dropdown-hover dropdown flex justify-center"
          v-if="breadcrumb.getSiblings().length > 0"
        >
          <label tabindex="0" id="breadcrumb-name">{{ breadcrumb.title }}</label>
          <div class="dropdown-content mt-0 pt-4">
            <ul tabindex="0" class="rounded-box ml-32 h-96 w-52 gap-2 overflow-y-scroll bg-cyan-900/80 p-2 shadow">
              <Children :list="breadcrumb.getParent().getChildren()" :current="current"></Children>
            </ul>
          </div>
        </div>
        <div class="dropdown dropdown-top flex justify-center" v-else>
          <label tabindex="0" class="self-center rounded-none">{{ breadcrumb.title }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";
import BookNode from "../../entities/BookNode";
import Node from "../../models/Node";
import Children from "../components/Children.vue";

export default defineComponent({
  props: { current: { type: Node } },
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
    inEditMode: () => RouteController.isEditMode(),
  },
  components: { Children },
});
</script>

<style scoped lang="postcss">
#breadcrumb-name {
  @apply self-center rounded p-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2;
}
</style>
