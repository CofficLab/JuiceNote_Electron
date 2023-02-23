<template>
  <div class="flex flex-row">
    <!-- 文章内容 -->
    <div class="flex flex-col ml-8 items-center flex-grow gap-4 pt-12 pb-48 min-h-screen">
      <Content class="prose w-full 2xl:prose-xl 3xl:prose-xl"></Content>
    </div>

    <!-- 文章的右侧栏 -->
    <aside class="hidden xl:flex xl:flex-row justify-end w-56 min-h-screen">
      <div class="flex flex-row justify-end w-56 fixed right-0 h-screen">
        <Toc :markdownSourceCode="markdownSourceCode"></Toc>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "../components/Toc.vue";
import Content from "../components/Content.vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  components: {
    Toc,
    Content,
  },
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
});
</script>
