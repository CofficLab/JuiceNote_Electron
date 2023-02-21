<template>
  <div v-on:click="switcher" class="btn-sm btn btn-ghost my-auto rounded-none">
    <PencilSquare v-if="!editMode"></PencilSquare>
    <ArrowUturnLeft v-if="editMode"></ArrowUturnLeft>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditModeController from "../controllers/EditModeController";
import PencilSquare from "../icons/pencil-square.vue";
import ArrowUturnLeft from "../icons/arrow-uturn-left.vue";

export default defineComponent({
  components: {
    PencilSquare,
    ArrowUturnLeft,
  },
  methods: {
    switcher() {
      EditModeController.edit_mode = !EditModeController.edit_mode;
    },
  },
  computed: {
    editMode() {
      return EditModeController.edit_mode;
    },
  },
});
</script>
