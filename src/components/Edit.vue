<template>
  <router-link
    v-bind:to="editLink"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-show="!editMode"
    ><PencilSquare></PencilSquare
  ></router-link>

  <router-link
    v-bind:to="showLink"
    class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
    v-show="editMode"
    ><ArrowUturnLeft></ArrowUturnLeft
  ></router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import PencilSquare from "../icons/pencil-square.vue";
import ArrowUturnLeft from "../icons/arrow-uturn-left.vue";

export default defineComponent({
  components: {
    PencilSquare,
    ArrowUturnLeft,
  },
  computed: {
    editMode() {
      return this.$route.name === "editor";
    },
    editLink(): string {
      return this.$route.path.replace("article", "editor");
    },
    showLink(): string {
      return this.$route.path.replace("editor", "article");
    },
    disabled(): boolean {
      return store.current(this.$route.path).isRoot() || store.current(this.$route.path) === store.root.first();
    },
  },
});
</script>
