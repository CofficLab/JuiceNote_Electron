<template>
  <div class="flex w-full flex-row justify-center bg-cyan-300/10">
    <Tiptap class="" v-model="content"></Tiptap>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Tiptap from "./Tiptap.vue";

export default defineComponent({
  components: { Tiptap },

  computed: {
    content: function () {
      return RouteController.getCurrentPage().markdownSourceCode();
    },
  },
});
</script>
