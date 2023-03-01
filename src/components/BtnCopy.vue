<template>
  <div
    v-bind:data-clipboard-text="markdownSourceCode"
    class="btn-ghost tooltip tooltip-left btn-sm btn flex items-center"
    data-tip="复制源码"
  >
    <IconCopy></IconCopy>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import ClipboardJS from "clipboard";
import IconCopy from "../assets/icons/clipboard-document.svg";
import ToastController from "../controllers/ToastController";

var clipboard = new ClipboardJS(".btn");
clipboard.on("success", function () {
  ToastController.set("已将 Markdown 源码复制到剪贴板");
});

export default defineComponent({
  computed: {
    markdownSourceCode(): string {
      return RouteController.getCurrentPage().getSourceCode();
    },
  },
  components: { IconCopy },
});
</script>
