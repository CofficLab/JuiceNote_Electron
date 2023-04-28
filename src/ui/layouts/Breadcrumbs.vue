<template>
  <div class="flex justify-start flex-grow h-full overflow-visible text-xs breadcrumbs" :class="{ 'text-yellow-500': editable }" v-if="visible">
    <ul class="flex flex-row justify-center">
      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center">
        <div class="flex justify-center dropdown-top dropdown-hover dropdown" v-if="breadcrumb.getSiblings().length > 0">
          <label
            tabindex="0"
            :class="{ 'text-info': !breadcrumb.isVisible }"
            class="flex flex-row items-center self-center gap-1 px-1 transition duration-200 rounded ring-primary ring-opacity-30 hover:scale-105 hover:ring-2"
          >
            <IconBook class="w-4 h-4" v-if="breadcrumb.isBook"></IconBook>
            <IconChapter class="w-4 h-4" v-if="breadcrumb.isChapter"></IconChapter>
            <IconPage class="w-4 h-4" v-if="breadcrumb.isPage"></IconPage>
            {{ breadcrumb.title }}
            <span v-if="editable">[{{ breadcrumb.id }}]</span>
          </label>

          <div class="pt-4 mt-0 dropdown-content">
            <ul tabindex="0" class="siblings-list">
              <Children :list="breadcrumb.getSiblings()"></Children>
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
import IconBook from "../icons/book.vue";
import IconChapter from "../icons/chapter.vue";
import IconPage from "../icons/page.vue";

const route = useRoute();

const getBreadcrumbs = () => RouteBox.getBreadcrumbs(route);

const visible = computed(() => !RouteBox.isHome(route));
const editable = computed(() => RouteBox.isEditable(route));
let breadcrumbs = ref(getBreadcrumbs());

window.addEventListener("nodeUpdated", function () {
  breadcrumbs.value = getBreadcrumbs();
});

watch(route, function () {
  if (visible.value) breadcrumbs.value = getBreadcrumbs();
});
</script>

<style lang="postcss" scoped>
.siblings-list {
  @apply rounded-box min-h-16 ml-32 max-h-96 w-40 gap-2 overflow-y-scroll bg-gray-900 bg-opacity-50 px-6 py-6 shadow-2xl backdrop-blur backdrop-filter;
}
</style>
