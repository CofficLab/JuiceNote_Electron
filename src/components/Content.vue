<template>
  <div class="mx-auto mt-2 flex justify-center">
    <div v-show="extensionName != '.vue'" v-html="html" class="prose w-full justify-center px-20 pt-5 pb-48"></div>

    <CurrentVuePage v-if="extensionName == '.vue'"></CurrentVuePage>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import { defineAsyncComponent } from "vue";
import { writeFileSync } from "fs";
import path from "path";

const currentVuePage = "./temp/Current.vue";

export default defineComponent({
  components: {
    CurrentVuePage: defineAsyncComponent(() => import("../../" + currentVuePage)),
  },
  data() {
    return {
      extensionName: ".md",
    };
  },
  computed: {
    current: () => RouteController.currentPage,
    html: () => RouteController.currentPage.markdownSourceCode(),
  },
  watch: {
    current() {
      this.show();
    },
  },
  mounted: function () {
    this.show();
  },
  methods: {
    show() {
      console.log("current is", this.current.id);
      this.extensionName = path.extname(this.current.path);
      if (this.extensionName == ".vue") {
        writeFileSync(currentVuePage, this.current.markdownSourceCode());
      }
    },
  },
});
</script>
