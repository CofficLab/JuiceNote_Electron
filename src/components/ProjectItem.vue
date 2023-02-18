<template>
  <a
    href="javascript:void(0)"
    v-if="!item.notLeaf()"
    class="pl-10 w-full py-1 my-1 flex justify-between pr-4"
    :class="{ 'bg-primary': currentCodeId == item.id, 'hover:bg-slate-500/50': currentCodeId != item.id }"
  >
    <span @click="go">{{ item.title }}</span>
    <span @click="deleteFile(item.title)">-</span>
  </a>

  <div class="flex flex-row hover:bg-slate-500/50 py-1" v-if="item.notLeaf()">
    <chevron-down class="pl-0 ml-0 mr-1 w-4 my-auto" :class="{ '-rotate-90': !open }"></chevron-down>
    <a href="javascript:void(0)" class="ml-0 w-full flex justify-between pr-4">
      <span @click="showChildren">{{ item.title }}</span>
      <span @click="toggleFileForm">+</span>
    </a>
  </div>
  <ul v-if="item.notLeaf() && item.children.length > 0" class="my-0 bg-gray-600">
    <li class="mt-1 flex justify-center px-4">
      <input
        type="text"
        v-model="newFileName"
        placeholder="新建文件"
        class="input input-ghost input-sm w-full max-w-xs text-center text-xs"
        @keyup.enter="makeFile"
        v-show="showFileForm"
      />
    </li>
    <li v-for="child in item.children" v-show="open" class="my-1 pl-1">
      <ProjectItem v-bind:item="child"></ProjectItem>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";
import ChevronDown from "../icons/chevron-down.vue";
import project from "../entities/Project";

export default defineComponent({
  props: ["item"],
  data() {
    return {
      open: false,
      showFileForm: false,
      newFileName: "",
    };
  },
  computed: {
    project: () => store.current.parent().project,
    currentCodeId() {
      return store.codeId;
    },
  },
  methods: {
    toggleFileForm: function () {
      this.showFileForm = !this.showFileForm;
    },
    showChildren: function () {
      this.open = !this.open;
    },
    go: function () {
      store.codeId = this.item.file;
      store.code = new project(this.item.file).getContent();
      console.log(store);
    },
    makeFile: function () {
      this.project.makeFile(this.newFileName);
      this.newFileName = "";
    },
    deleteFile: function (name) {
      this.project.deleteFile(name);
      store.refresh();
    },
  },
  components: { Link, ChevronDown },
});
</script>
