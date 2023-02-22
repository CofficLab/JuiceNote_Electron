<template>
  <button class="btn-sm btn btn-ghost" v-bind:data-clipboard-text="markdownSourceCode">
    <IconCopy></IconCopy>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ClipboardJS from "clipboard";
import IconCopy from "../icons/clipboard-document.vue";
import ToastController from "../controllers/ToastController";

var clipboard = new ClipboardJS(".btn");
clipboard.on("success", function () {
  ToastController.set("已将 Markdown 源码复制到剪贴板");
});

export default defineComponent({
  computed: {
    markdownSourceCode(): string {
      return RouteController.getCurrentPage().markdownSourceCode();
    },
  },
  components: { IconCopy },
});
</script>
