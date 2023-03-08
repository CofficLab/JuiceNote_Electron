<template>
  <div @click="rename">
    <ArrowLeftCircle></ArrowLeftCircle>
    重命名
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
export default defineComponent({
  props: ["node"],
  methods: {
    rename() {
      console.log("显示重命名的弹层");
      NodeController.setRenamingNode(this.node);
    },
  },
  components: { ArrowLeftCircle },
});
</script>
