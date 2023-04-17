<template>
  <div class="copy" v-bind:data-clipboard-text="content">
    <IconCopy v-if="showIcon"></IconCopy>
    <span v-if="showText">复制源码</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ClipboardJS from "clipboard";
import ToastController from "../../controllers/ToastController";
import IconCopy from "../../assets/icons/clipboard-document.svg";
import { useRoute } from "vue-router";
import { Node } from "../../models/Node";

var clipboard = new ClipboardJS(".copy");
clipboard.on("success", function () {
  ToastController.set("已将源码复制到剪贴板");
});

const route = useRoute()

const props=defineProps( {
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
  })

const content=computed( () => Node.find(parseInt(route.params.id.toString())).content)

</script>
