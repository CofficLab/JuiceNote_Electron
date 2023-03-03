<template>
  <div class="toast-start toast toast-top mt-12 ml-72" v-show="message.length > 0">
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
