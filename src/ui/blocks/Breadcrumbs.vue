<template>
  <div class="breadcrumbs flex h-full flex-grow justify-start overflow-visible text-xs" :class="{ 'text-yellow-500': editable }">
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="dropdown-top dropdown-hover dropdown flex justify-center" v-if="breadcrumb.getSiblings().length > 0">
          <label tabindex="0" :class="{ 'text-info': !breadcrumb.isVisible }" class="self-center rounded px-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2">
            {{ breadcrumb.title }}
            <span v-if="editable">[{{ breadcrumb.id }}]</span>
          </label>
          <div class="dropdown-content mt-0 pt-4">
            <ul tabindex="0" class="rounded-box ml-36 h-96 w-52 gap-2 overflow-y-scroll bg-base-200 p-2 shadow">
              <Children :list="breadcrumb.getParent().getChildren()" :current="current"></Children>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Children from "../components/Children.vue";
import RouteBox from "../entities/RouteBox";

const route = useRoute();

const getBreadcrumbs = () => RouteBox.getBreadcrumbs(route);

const current = computed(() => RouteBox.getCurrentNode(route));
const editable = computed(() => RouteBox.isEditable(route));
let breadcrumbs = ref(getBreadcrumbs());

window.addEventListener("nodeUpdated", function () {
  breadcrumbs.value = getBreadcrumbs();
});

watch(route, function () {
  breadcrumbs.value = getBreadcrumbs();
});
</script>
