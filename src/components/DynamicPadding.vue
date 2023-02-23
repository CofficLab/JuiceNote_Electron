<template>
  <span class="ml-1" v-for="i in Math.max(0, count)"></span>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
});
</script>
