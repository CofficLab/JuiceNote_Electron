<template>
  <div v-on:click="edit" class="btn-sm btn xl:btn-md my-auto rounded-none" v-show="!editMode">
    <PencilSquare></PencilSquare>
  </div>

  <div v-on:click="show" class="btn-sm btn xl:btn-md my-auto rounded-none" v-show="editMode">
    <ArrowUturnLeft></ArrowUturnLeft>
  </div>
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
  methods: {
    edit() {
      store.edit_mode = true;
    },
    show() {
      store.edit_mode = false;
    },
  },
  computed: {
    editMode() {
      return store.edit_mode;
    },
    disabled(): boolean {
      return store.current.isRoot() || store.current === store.root.first();
    },
  },
});
</script>
