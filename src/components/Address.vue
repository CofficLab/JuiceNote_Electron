<template>
  <div class="text-red-900 align-middle text-center">
    {{ address }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      address: window.location.href,
    };
  },
});
</script>
