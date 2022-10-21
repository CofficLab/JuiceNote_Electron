<template>
  <div class="toast toast-start toast-bottom mb-12" v-show="message.length > 0">
    <div class="alert alert-success">
      <div>
        <span v-html="message"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    message() {
      return store.toast;
    },
  },
});
</script>
