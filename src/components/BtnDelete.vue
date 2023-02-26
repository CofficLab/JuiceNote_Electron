<template>
  <div>
    <button v-on:click="del" class="btn-ghost tooltip tooltip-bottom btn-sm btn my-auto" data-tip="删除章节或页面">
      <Trash></Trash>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";
import Trash from "../icons/trash.vue";

export default defineComponent({
  methods: {
    del: function () {
      ToastController.set(RouteController.delete());
    },
  },
  components: { Trash },
});
</script>
