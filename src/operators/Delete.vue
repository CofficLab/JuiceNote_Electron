<template>
  <div @click="deleteBookNode">删除</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";
export default defineComponent({
  props: ["bookNode"],
  methods: {
    deleteBookNode() {
      ToastController.set(RouteController.delete(this.bookNode.id));
    },
  },
});
</script>
