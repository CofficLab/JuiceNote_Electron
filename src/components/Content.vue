<template>
  <div ref="content" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";

export default defineComponent({
  computed: {
    body(): string {
      console.log("get content of", store.current.id);
      let dom = document.createElement("div");
      dom.innerHTML = store.edit_mode ? store.current.htmlWithToc() : store.current.html();

      // 插入可执行的脚本
      let script = dom.getElementsByTagName("script").item(0);
      let scriptDom = document.createElement("script");

      if (script != undefined) {
        script.remove();
        scriptDom.innerHTML = script.innerHTML;
      }

      this.$nextTick(() => {
        this.$refs.content.append(scriptDom);
      });

      return dom.innerHTML;
    },
  },
});
</script>
