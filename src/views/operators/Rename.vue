<template>
  <div @click="rename">
    <ArrowLeftCircle v-if="showIcon"></ArrowLeftCircle>
    <span v-if="showText">重命名</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import { Node } from "../../models/Node";
export default defineComponent({
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
    node: {
      type: Node,
      require: true,
    },
  },
  methods: {
    rename() {
      console.log("显示重命名的弹层");
      NodeController.setRenamingNode(this.node);
    },
  },
  components: { ArrowLeftCircle },
});
</script>
