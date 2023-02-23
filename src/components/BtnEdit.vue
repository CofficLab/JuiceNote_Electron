<template>
  <div>
    <div
      v-on:click="switcher"
      class="btn-sm btn btn-ghost tooltip-bottom tooltip flex items-center"
      data-tip="编辑页面"
    >
      <PencilSquare v-if="!editing"></PencilSquare>
      <ArrowUturnLeft v-if="editing"></ArrowUturnLeft>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PencilSquare from "../icons/pencil-square.vue";
import ArrowUturnLeft from "../icons/arrow-uturn-left.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    PencilSquare,
    ArrowUturnLeft,
  },
  methods: {
    switcher: () => RouteController.toggleEditMode(),
  },
  computed: {
    editing: () => RouteController.editMode,
  },
});
</script>
