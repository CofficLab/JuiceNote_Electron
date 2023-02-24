<template>
  <div class="flex flex-row flex-grow gap-4 overflow-scroll pb-48 h-screen z-0 w-full">
    <main id="sample" class="w-full">
      <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
      <Editor
        api-key="no-api-key"
        :init="{
          plugins: 'lists link image table code help wordcount',
        }"
      />
    </main>
  </div>
</template>

<script lang="ts">
import fs from "fs";
import path from "path";
import { defineComponent } from "vue";
import Toc from "../components/Toc.vue";
import RouteController from "../controllers/RouteController";
import Config from "../entities/Config";
import ToastController from "../controllers/ToastController";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  components: {
    Toc,
    Editor,
  },
});
</script>
