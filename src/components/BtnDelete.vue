<template>
  <button
    v-on:click="del"
    class="btn-ghost tooltip tooltip-left btn-sm btn my-auto flex justify-center"
    data-tip="删除章节或页面"
  >
    <Trash></Trash>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";
import Trash from "../assets/icons/trash.svg";

export default defineComponent({
  methods: {
    del: function () {
      ToastController.set(RouteController.delete());
    },
  },
  components: { Trash },
});
</script>
