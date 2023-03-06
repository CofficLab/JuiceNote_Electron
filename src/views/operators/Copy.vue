<template>
  <div class="copy" v-bind:data-clipboard-text="markdownSourceCode">复制源码</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClipboardJS from "clipboard";
import ToastController from "../../controllers/ToastController";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  ToastController.set("已将源码复制到剪贴板");
});

export default defineComponent({
  props: ["bookNode"],
  computed: {
    markdownSourceCode(): string {
      return this.bookNode.getSourceCode();
    },
  },
});
</script>
