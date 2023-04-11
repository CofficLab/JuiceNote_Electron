<template>
  <div class="alert alert-success h-8" v-show="message.length > 0">
    <span v-html="message"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToastController from "../../controllers/ToastController";

export default defineComponent({
  computed: {
    message() {
      return ToastController.toast;
    },
  },
});
</script>
