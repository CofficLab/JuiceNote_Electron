<template>
  <div class="copy" v-bind:data-clipboard-text="content">
    <IconCopy v-if="showIcon"></IconCopy>
    <span v-if="showText">复制源码</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClipboardJS from "clipboard";
import ToastController from "../../controllers/ToastController";
import NodeController from "../../controllers/NodeController";
import IconCopy from "../../assets/icons/clipboard-document.svg";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  ToastController.set("已将源码复制到剪贴板");
});

export default defineComponent({
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  computed: {
    content: () => NodeController.getCurrentPage().content,
  },
  components: { IconCopy },
});
</script>
