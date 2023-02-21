<template>
  <button class="btn-sm btn btn-ghost tooltip tooltip-bottom my-auto" data-tip="在浏览器中打开官方文档">
    <a href="/" target="_blank" class="official-link"><ArrowTopRightOnSquare></ArrowTopRightOnSquare></a>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowTopRightOnSquare from "../icons/arrow-top-right-on-square.vue";

export default defineComponent({
  components: {
    ArrowTopRightOnSquare,
  },
});
</script>
