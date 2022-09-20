<template>
  <ul class="menu z-2">
    <li class="rounded-none" v-for="navigator in navigators">
      <div class="bg-base-content w-full p-0" v-bind:class="navigator == hovered ? 'h-20' : ''"></div>
      <div
        class="rounded-none border-0 h-16"
        draggable="true"
        v-on:dragend="dragEnd(navigator)"
        v-on:dragstart="dragStart(navigator)"
        v-on:dragenter="dragEnter(navigator)"
      >
        <div v-text="navigators.indexOf(navigator)" class="w-1/6"></div>
        <div v-text="navigator.name"></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { navigatorNode } from "../models/nav";
import store from "../models/store";

let navigators: navigatorNode[];

export default defineComponent({
  data() {
    return {
      dragged: null,
      hovered: null,
      navigators: store.navigators,
    };
  },
  methods: {
    dragStart(navigator) {
      // console.log("drag start", navigator.name);
      this.dragged = navigator;
    },
    dragEnd(navigator) {
      let navigators = this.navigators;
      let newOrder = navigators.indexOf(this.hovered);
      // console.log("drag end", navigator.name);
      // console.log("original order ", markdown.getOrder(navigator.name));
      // console.log("new order ", newOrder);
      // console.log("target located at ", this.navigators.indexOf(navigator));
      navigators.splice(navigators.indexOf(navigator), 1);
      navigators.splice(newOrder, 0, navigator);

      // console.log(navigators);
      store.updateNavigators(navigators);
      this.hovered = null;
    },
    dragEnter(navigator) {
      this.hovered = navigator;
    },
  },
});
</script>
