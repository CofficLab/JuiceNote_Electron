<template>
  <div ref="content" class="prose mx-auto min-h-screen pb-96 container" v-html="body"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";
export default defineComponent({
  data: function () {
    return {
      body: "",
    };
  },

  created: function () {
    let dom = document.createElement("div");
    dom.innerHTML = store.edit_mode ? store.current.htmlWithToc() : store.current.html();

    this.body = dom.innerHTML;

    // 插入可执行的脚本
    let script = dom.getElementsByTagName("script").item(0);
    let scriptDom = document.createElement("script");

    if (script != undefined) scriptDom.innerHTML = script.innerHTML;

    this.$nextTick(() => {
      this.$refs.content.append(scriptDom);
    });
  },
});
</script>
