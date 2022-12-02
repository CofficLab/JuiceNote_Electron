<template>
  <a
    href="javascript:void(0)"
    v-on:click="go"
    v-if="!item.isFolder"
    class="pl-10 w-full py-1 my-1 flex"
    :class="{ 'bg-primary': currentCodeId == item.id, 'hover:bg-slate-500/50': currentCodeId != item.id }"
    >{{ item.title }}</a
  >

  <div class="flex flex-row hover:bg-slate-500/50 py-1" v-if="item.isFolder">
    <chevron-down class="pl-0 ml-0 mr-1 w-4 my-auto" :class="{ '-rotate-90': !open }"></chevron-down>
    <a href="javascript:void(0)" class="ml-0 w-full" @click="showChildren">{{ item.title }}</a>
  </div>
  <ul v-if="item.isFolder && item.children.length > 0" class="my-0">
    <li v-for="child in item.children" v-show="open" class="my-1 pl-1">
      <ProjectItem v-bind:item="child"></ProjectItem>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";
import VJstree from "vue-jstree";
import ChevronDown from "../icons/chevron-down.vue";
import store from "../models/store";
import project from "../models/project";

export default defineComponent({
  props: ["item"],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    currentCodeId() {
      return store.codeId;
    },
  },
  methods: {
    showChildren: function () {
      this.open = !this.open;
    },
    go: function () {
      store.codeId = this.item.file;
      store.code = new project(this.item.file).getContent();
      console.log(store);
    },
  },
  components: { Link, VJstree, ChevronDown },
});
</script>
