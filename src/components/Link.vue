<template>
  <div v-bind:href="href" v-on:click="go"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";
export default defineComponent({
  props: ["href"],
  methods: {
    go: function () {
      store.goto(this.href);
    },
  },
});
</script>
