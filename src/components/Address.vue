<template>
  <div class="text-red-900 align-middle text-center">
    {{ address }}
  </div>
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      address: unescape(window.location.href),
    };
  },
});
</script>
