<template>
  <div class="breadcrumbs flex h-full flex-grow justify-start overflow-visible text-xs" :class="{ 'text-yellow-500': editable }">
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown-bottom dropdown-hover dropdown flex justify-center" v-if="breadcrumb.getSiblings().length > 0">
          <label tabindex="0" :class="{ 'text-info': !breadcrumb.isVisible }" class="self-center rounded p-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2">
            {{ breadcrumb.title }}
            <span v-if="editable">[{{ breadcrumb.id }}]</span>
          </label>
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

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Node } from "../../models/Node";
import Children from "../components/Children.vue";

const route = useRoute()

const getBreadcrumbs = () => current.value.getParents().concat([current.value]);

const current = computed(() => Node.find(route.params.id));
const editable = computed(() => route.name == "lessons.edit");
let breadcrumbs = ref(getBreadcrumbs());

window.addEventListener("nodeUpdated", function () {
  breadcrumbs.value = getBreadcrumbs();
});
</script>
