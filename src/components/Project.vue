<template>
  <div class="flex flex-col gap-0 justify-start h-screen pb-8 w-56 text-gray-300">
    <div class="bg-slate-900 px-6 py-2">{{ project.title }}</div>
    <div class="px-0 bg-slate-900/80 h-full">
      <ul v-for="menu in project.children">
        <li><ProjectItem :item="menu"></ProjectItem></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";
import ChevronDown from "../icons/chevron-down.vue";
import store from "../models/store";
import ProjectItem from "./ProjectItem.vue";

export default defineComponent({
  computed: {
    project: function () {
      let project = store.current.parent().project;

      return project;
    },
  },
  components: { Link, ChevronDown, ProjectItem },
});
</script>
