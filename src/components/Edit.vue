<template>
  <div v-on:click="switcher" class="btn-sm btn my-auto rounded-none">
    <PencilSquare v-if="!editMode"></PencilSquare>
    <ArrowUturnLeft v-if="editMode"></ArrowUturnLeft>
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
    switcher() {
      store.edit_mode = !store.edit_mode;
    },
  },
  computed: {
    editMode() {
      return store.edit_mode;
    },
  },
});
</script>
