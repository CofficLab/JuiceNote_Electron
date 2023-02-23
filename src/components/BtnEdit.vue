<template>
  <div>
    <div
      v-on:click="switcher"
      class="btn-sm btn btn-ghost my-auto tooltip-bottom tooltip flex items-center"
      data-tip="编辑页面"
    >
      <PencilSquare v-if="!editMode"></PencilSquare>
      <ArrowUturnLeft v-if="editMode"></ArrowUturnLeft>
    </div>
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
      EditModeController.toggle();
    },
  },
  computed: {
    editMode() {
      return EditModeController.edit_mode;
    },
  },
});
</script>
