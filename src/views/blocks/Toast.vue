<template>
  <div class="toast-center toast toast-top ml-24 w-72" v-show="message.length > 0">
    <div class="alert alert-success w-full">
      <div>
        <span v-html="message"></span>
      </div>
    </div>
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
