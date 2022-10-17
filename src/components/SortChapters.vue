<template>
  <ul class="menu z-2">
    <li class="rounded-none" v-for="(chapter, key) in chapters">
      <div class="bg-base-content w-full p-0" v-bind:class="key == order ? 'h-20' : ''"></div>
      <div
        class="rounded-none border-0 h-16"
        draggable="true"
        v-on:dragend="dragEnd(chapter)"
        v-on:dragstart="dragStart(chapter)"
        v-on:dragenter="dragEnter(chapter, key)"
      >
        <div v-text="chapters.indexOf(chapter)" class="w-1/6"></div>
        <div v-text="chapter.title"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";
import store from "../models/store";

export default defineComponent({
  data() {
    return {
      dragged: null,
      hovered: null,
      order: null,
      navigators: store.navigators,
    };
  },
  computed: {
    book(): navigatorNode | undefined {
      let activatedOnes = store.navigators.getActivatedChildren(this.$route.path);
      let book = activatedOnes.shift();

      return book;
    },
    chapters() {
      let activatedOnes = store.navigators.getActivatedChildren(this.$route.path);
      let book = activatedOnes.shift();

      return book ? book.children : [];
    },
  },
  methods: {
    dragStart(navigator) {
      console.log("drag start", navigator.title);
      this.dragged = navigator;
    },
    dragEnd(chapter) {
      let chapters = this.chapters;

      chapters.splice(chapters.indexOf(chapter), 1);
      chapters.splice(this.order, 0, chapter);

      // console.log(navigators);
      let book = this.book;
      book.children = chapters;
      store.updateNavigator(book);
      this.hovered = null;
      this.order = null;
    },
    dragEnter(chapter: navigatorNode, key) {
      this.hovered = chapter;
      this.order = key;
      console.log(key);
    },
  },
});
</script>
