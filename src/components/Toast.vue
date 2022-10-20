<template>
  <div class="toast toast-start toast-bottom mb-12" v-show="message">
    <div class="alert alert-success">
      <div>
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Trash from "../icons/trash.vue";

export default defineComponent({
  computed: {
    message() {
      return store.toast;
    },
  },
  components: { Trash },
});
</script>
