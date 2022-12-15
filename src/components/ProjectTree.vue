<template>
  <div class="flex flex-col gap-0 justify-start h-full pb-8 w-56 text-gray-300">
    <div class="bg-slate-900 px-6 py-2 flex justify-between">
      <span>{{ project.title }}</span>
      <a href="javascript:void(0)" @click="toggleFileForm">+</a>
    </div>
    <div class="px-0 bg-slate-900/80 h-full overflow-scroll">
      <ul class="overflow-scroll">
        <li class="mt-2 flex justify-center px-4">
          <input
            type="text"
            v-model="newFileName"
            placeholder="新建文件"
            class="input input-ghost input-sm w-full max-w-xs text-center text-xs"
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
import ChevronDown from "../icons/chevron-down.vue";
import store from "../models/store";
import ProjectItem from "./ProjectItem.vue";
import project from "../models/project";

export default defineComponent({
  data() {
    return {
      newFileName: "",
      showFileForm: false,
      project: store.project,
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
