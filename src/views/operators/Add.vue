<template>
  <div @click="add">添加章节或页面</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";
export default defineComponent({
  props: ["bookNode"],
  methods: {
    add() {
      console.log("显示添加的弹层");
      RouteController.adding = true;
    },
  },
});
</script>
