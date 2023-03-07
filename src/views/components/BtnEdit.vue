<template>
  <div
    v-on:click="switcher"
    class="btn-ghost tooltip tooltip-left btn-sm btn my-auto flex w-12 items-center"
    data-tip="编辑页面"
  >
    <PencilSquare v-if="!editable"></PencilSquare>
    <ArrowUturnLeft v-if="editable"></ArrowUturnLeft>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PencilSquare from "../../assets/icons/pencil-square.svg";
import ArrowUturnLeft from "../../assets/icons/arrow-uturn-left.svg";
import RouteController from "../../controllers/RouteController";

export default defineComponent({
  components: {
    PencilSquare,
    ArrowUturnLeft,
  },
  methods: {
    switcher: () => RouteController.toggleEditMode(),
  },
  computed: {
    editable: () => RouteController.editable,
  },
});
</script>
