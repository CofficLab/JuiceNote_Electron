<template>
  <ul class="menu z-2">
    <li class="rounded-none" v-for="navigator in navigators">
      <div
        class="rounded-none border-0 border-t-2"
        draggable="true"
        v-on:dragend="dragEnd(navigator)"
        v-on:dragstart="dragStart(navigator)"
        v-on:dragenter="dragEnter(navigator)"
        v-bind:class="navigator == hovered ? 'border-red-300' : ''"
      >
        <div v-text="navigators.indexOf(navigator)" class="w-1/6"></div>
        <div v-text="navigator.name"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import markdown from "../models/markdown";
import { nav, navigatorNode } from "../models/nav";

export default defineComponent({
  data() {
    return {
      expand: false,
      destination: null,
      navigators: [],
      hovered: null,
    };
  },
  mounted: function () {
    this.navigators = this.getNavigators();
  },
  methods: {
    getNavigators(): navigatorNode[] {
      // console.log('navigators are: ' + nav.getNavigators())
      return nav.getNavigators();
    },
    dragStart(navigator) {
      console.log("drag start", navigator.name);
    },
    dragEnd(navigator) {
      let navigators = this.navigators;
      let newOrder = navigators.indexOf(this.destination);
      console.log("drag end", navigator.name);
      console.log("original order ", markdown.getOrder(navigator.name));
      console.log("new order ", newOrder);
      console.log("target located at ", this.navigators.indexOf(navigator));
      navigators.splice(navigators.indexOf(navigator), 1);
      navigators.splice(newOrder, 0, navigator);

      console.log(navigators);
      nav.update(navigators);
      this.navigators = this.getNavigators();
    },
    dragEnter(navigator) {
      this.destination = navigator;
      this.hovered = navigator;
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
});
</script>
