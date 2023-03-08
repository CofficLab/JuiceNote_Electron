<template>
  <div @click="deleteBookNode">
    <Trash v-if="showIcon"></Trash>
    <span v-if="showText">删除</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";
import ToastController from "../../controllers/ToastController";
import Trash from "../../assets/icons/trash.svg";
export default defineComponent({
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  methods: {
    deleteBookNode() {
      ToastController.set(RouteController.delete(this.bookNode.id));
    },
  },
  components: { Trash },
});
</script>
