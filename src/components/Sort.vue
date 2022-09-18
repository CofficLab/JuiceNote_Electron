<template>
  <ul class="menu z-2">
    <li class="rounded-none" v-for="navigator in navigators">
      <div
        v-text="navigator.name"
        class="btn"
        draggable="true"
        v-on:dragend="dragEnd(navigator)"
        v-on:dragstart="dragStart(navigator)"
        v-on:dragenter="dragEnter(navigator)"
      ></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";

export default defineComponent({
  data() {
    return {
      expand: false,
      destination: "",
    };
  },
  methods: {
    dragStart(navigator) {
      console.log("drag start", navigator.name);
    },
    dragEnd(navigator) {
      console.log("drag end", navigator.name);
      console.log("destination ", this.destination);
    },
    dragEnter(navigator) {
      console.log("drag enter", navigator.name);
      this.destination = navigator.name;
    },
    getText(navigator: navigatorNode): string {
      let splitted = navigator.name.split("@");
      let text = splitted.pop();

      if (text === "home") {
        return "首页";
      }

      return text === undefined ? "" : text;
    },
  },
  computed: {
    navigators() {
      // console.log('navigators are: ' + nav.getNavigators())
      return nav.getNavigators();
    },
  },
});
</script>
