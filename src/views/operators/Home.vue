<template>
  <div @click="goHome"><Home></Home></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../../assets/icons/home.svg";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";
import Link from "../components/Link.vue";

export default defineComponent({
  components: { Home, Link },
  methods: {
    goHome() {
      NodeController.setCurrentPage(0);
    },
  },
});
</script>
