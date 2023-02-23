<template>
  <span class="ml-1" v-for="i in count"></span>
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
