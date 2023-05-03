<template>
  <div class="flex h-full w-56 flex-col justify-start gap-0 pb-8 text-gray-300">
    <div class="flex justify-between bg-slate-900 px-6 py-2">
      <span>{{ project.title }}</span>
      <a href="javascript:void(0)" @click="toggleFileForm">+</a>
    </div>
    <div class="h-full overflow-scroll bg-slate-900/80 px-0">
      <ul class="overflow-scroll">
        <li class="mt-2 flex justify-center px-4">
          <input
            type="text"
            v-model="newFileName"
            placeholder="新建文件"
            class="input-ghost input input-sm w-full max-w-xs text-center text-xs"
            v-show="showFileForm"
            autofocus
            @keyup.enter="makeFile"
          />
        </li>
        <li v-for="menu in project.children"><ProjectItem :item="menu"></ProjectItem></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";
import ChevronDown from "../icons/chevron-down.svg";
import ProjectController from "../controllers/ProjectController";
import ProjectItem from "./ProjectItem.vue";
import project from "../entities/Project";

export default defineComponent({
  data() {
    return {
      newFileName: "",
      showFileForm: false,
      project: ProjectController.project,
    };
  },
  methods: {
    toggleFileForm: function () {
      this.showFileForm = !this.showFileForm;
    },
    makeFile: function () {
      this.project.makeFile(this.newFileName);
      this.newFileName = "";
    },
  },
  components: { Link, ChevronDown, ProjectItem },
});
</script>
