<template>
  <div id="breadcrumbs" :class="{ 'text-yellow-500': editable }">
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="breadcrumb-item" v-if="breadcrumb.getSiblings().length > 0">
          <label tabindex="0" id="breadcrumb-name"
            >{{ breadcrumb.title }} <span v-if="editable && breadcrumb.isPage">[{{ breadcrumb.id }}]</span></label
          >
          <div class="dropdown-content mt-0 pt-4">
            <ul tabindex="0" class="rounded-box ml-32 h-96 w-52 gap-2 overflow-y-scroll bg-cyan-900/80 p-2 shadow">
              <Children :list="breadcrumb.getParent().getChildren()" :current="current"></Children>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";
import Children from "../components/Children.vue";

export default defineComponent({
  props: { current: { type: Node, required: true } },
  computed: {
    editable: () => NodeController.getEditable(),
    breadcrumbs: () => NodeController.getBreadcrumbs(),
  },
  components: { Children },
});
</script>

<style scoped lang="postcss">
#breadcrumbs {
  @apply breadcrumbs flex h-full flex-grow justify-start overflow-visible;
  .breadcrumb-item {
    @apply dropdown-hover dropdown-bottom dropdown flex justify-center;
  }
}
#breadcrumb-name {
  @apply self-center rounded p-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2;
}
</style>
