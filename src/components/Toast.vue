<template>
  <div class="toast toast-end toast-top mt-12 mr-56" v-show="message.length > 0">
    <div class="alert alert-success">
      <div>
        <span v-html="message"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToastController from "../controllers/ToastController";

export default defineComponent({
  computed: {
    message() {
      return ToastController.toast;
    },
  },
});
</script>
