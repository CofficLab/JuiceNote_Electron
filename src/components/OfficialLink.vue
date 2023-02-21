<template>
  <a
    href="/"
    target="_blank"
    class="official-link btn-sm btn btn-ghost tooltip tooltip-bottom my-auto items-center flex"
    data-tip="在浏览器中打开官方文档"
    ><ArrowTopRightOnSquare></ArrowTopRightOnSquare
  ></a>
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
