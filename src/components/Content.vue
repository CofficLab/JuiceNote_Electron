<template>
  <div ref="content" v-html="html"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import RouteController from "../controllers/RouteController";
import fs from "fs";
import path from "path";
import Config from "../entities/Config";

export default defineComponent({
  computed: {
    html(): string {
      console.log("get content of", RouteController.currentPage.id);
      let dom = document.createElement("div");
      let scriptDom = document.createElement("script");

      dom.innerHTML = RouteController.getCurrentPage().html();
      scriptDom.innerHTML = fs.readFileSync(path.join(Config.markdownRootPath, "/footer.js")).toString();

      this.$nextTick(() => {
        this.$refs.content.append(scriptDom);
      });

      return dom.innerHTML;
    },
  },
});
</script>
