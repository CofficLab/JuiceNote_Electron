<template>
  <div
    v-bind:data-clipboard-text="current?.content"
    class="btn-ghost tooltip tooltip-left btn-sm btn flex w-12 items-center"
    data-tip="复制源码"
  >
    <IconCopy></IconCopy>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClipboardJS from "clipboard";
import IconCopy from "../../assets/icons/clipboard-document.svg";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";

var clipboard = new ClipboardJS(".btn");
clipboard.on("success", function () {
  ToastController.set("已将 Markdown 源码复制到剪贴板");
});

export default defineComponent({
  props: { current: { type: Node, requited: true } },
  components: { IconCopy },
});
</script>
