<template>
  <div class="breadcrumbs flex h-full flex-grow justify-start overflow-visible text-xs" :class="{ 'text-yellow-500': editable }" v-if="visible">
    <ul class="flex flex-row justify-center">
      <li class="flex justify-center">
        <div class="dropdown-hover dropdown-top dropdown flex justify-center">
          <label tabindex="0" class="flex flex-row items-center gap-1 self-center rounded px-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2">
            <IconDatabase class="h-4 w-4"></IconDatabase>
            知识库
          </label>

          <div class="dropdown-content mt-0 pt-4">
            <ul tabindex="0" class="siblings-list">
              <li>知识库</li>
              <li>商城</li>
            </ul>
          </div>
        </div>
      </li>

      <li v-for="breadcrumb in breadcrumbs" class="flex justify-center" v-if="isLesson">
        <div class="dropdown-top dropdown-hover dropdown flex justify-center" v-if="breadcrumb.getSiblings().length > 0">
          <label
            tabindex="0"
            :class="{ 'text-info': !breadcrumb.isVisible }"
            class="flex flex-row items-center gap-1 self-center rounded px-1 ring-primary ring-opacity-30 transition duration-200 hover:scale-105 hover:ring-2"
          >
            <IconBook class="h-4 w-4" v-if="breadcrumb.isBook"></IconBook>
            <IconChapter class="h-4 w-4" v-if="breadcrumb.isChapter"></IconChapter>
            <IconPage class="h-4 w-4" v-if="breadcrumb.isPage"></IconPage>
            {{ breadcrumb.title }}
            <span v-if="editable">[{{ breadcrumb.id }}]</span>
          </label>

          <div class="dropdown-content mt-0 pt-4">
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
import IconDatabase from "../icons/database.vue";

const route = useRoute();

const getBreadcrumbs = () => RouteBox.getBreadcrumbs(route);

const visible = computed(() => !RouteBox.isHome(route));
const editable = computed(() => RouteBox.isEditable(route));
const isLesson = computed(() => RouteBox.isLesson(route));
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
  @apply rounded-box min-h-16 max-h-96 w-40 gap-2 overflow-y-scroll bg-primary bg-opacity-90 px-6 py-6 shadow-2xl backdrop-blur-sm backdrop-filter;
}
</style>
