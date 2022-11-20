<template>
  <div v-bind:href="href" v-on:click="go" v-bind:class="shouldActive(href) ? 'active' : ''"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../app.css";
import store from "../models/store";
export default defineComponent({
  props: ["href"],
  methods: {
    shouldActive: function (id) {
      return store.current.id == id;
    },
    go: function () {
      this.active = true;
      store.goto(this.href);
    },
  },
});
</script>
