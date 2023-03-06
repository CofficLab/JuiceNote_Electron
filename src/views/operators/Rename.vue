<template>
  <div @click="rename">重命名</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";
export default defineComponent({
  props: ["bookNode"],
  methods: {
    rename() {
      console.log("显示重命名的弹层");
      RouteController.renamingBookNode = this.bookNode;
    },
  },
});
</script>
