<template>
  <div class="flex flex-row">
    <!-- 文章内容 -->
    <div class="ml-8 flex min-h-screen flex-grow flex-col items-center gap-4 pt-12 pb-48">
      <Content></Content>
    </div>

    <!-- 文章的右侧栏 -->
    <aside class="hidden min-h-screen w-56 justify-end xl:flex xl:flex-row">
      <div class="fixed right-0 flex h-screen w-56 flex-row justify-end">
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
