<template>
  <div @click="add">
    <Plus v-if="showIcon"></Plus>
    <span v-if="showText">添加章节或页面</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Plus from "../../assets/icons/plus.svg";
import RouteController from "../../controllers/RouteController";
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
  },
  methods: {
    add() {
      console.log("显示添加的弹层");
      RouteController.adding = true;
    },
  },
  components: { Plus },
});
</script>
