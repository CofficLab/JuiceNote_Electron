<template>
  <div class="alert alert-success h-8 rounded-sm" v-show="message.length > 0">
    <span v-html="html"></span>
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
