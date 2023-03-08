<template>
  <a @click="transform">转化成手册</a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowLeftCircle from "../../assets/icons/arrow-left-circle.svg";
import Link from "../components/Link.vue";
import { Node } from "../../models/Node";
import ToastController from "../../controllers/ToastController";

export default defineComponent({
  props: { current: { type: Node, required: true } },
  components: {
    ArrowLeftCircle,
    Link,
  },
  methods: {
    transform() {
      return ToastController.set(this.current.transformToManual());
    },
  },
});
</script>
