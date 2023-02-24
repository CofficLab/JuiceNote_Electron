<template>
  <div class="z-0 flex h-screen w-full flex-grow flex-row gap-4 overflow-scroll pb-48">
    <main class="w-full">
      <div id="editor" class="h-screen w-full"></div>
    </main>

    <textarea class="hidden" id="editor-content" v-text="markdownSourceCode"></textarea>
    <div class="hidden" ref="script"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  mounted: function () {
    console.log("初始化编辑器");
  },
});
</script>
