<template>
  <div class="z-0 flex h-screen w-full flex-grow flex-row gap-4 overflow-scroll pb-48">
    <main class="w-full">
      <textarea name="" id="sample" cols="30" rows="10"></textarea>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "../components/Toc.vue";
import Editor from "@tinymce/tinymce-vue";
import tinymce from "_tinymce@6.3.2@tinymce";

export default defineComponent({
  components: {
    Toc,
    Editor,
  },
  mounted: function () {
    this.$nextTick(function () {
      tinymce.init({
        selector: "#sample",
        base_url: "tiny",
        suffix: ".min",
        language: "zh-Hans",
      });
    });
  },
});
</script>
