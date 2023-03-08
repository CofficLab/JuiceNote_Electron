<template>
  <div class="copy" v-bind:data-clipboard-text="content">复制源码</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClipboardJS from "clipboard";
import ToastController from "../../controllers/ToastController";
import NodeController from "../../controllers/NodeController";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  ToastController.set("已将源码复制到剪贴板");
});

export default defineComponent({
  computed: {
    content: () => NodeController.getCurrentPage().content,
  },
});
</script>
