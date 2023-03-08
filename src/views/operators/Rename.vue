<template>
  <div @click="rename">重命名</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
export default defineComponent({
  props: ["node"],
  methods: {
    rename() {
      console.log("显示重命名的弹层");
      NodeController.setRenamingNode(this.node);
    },
  },
});
</script>
