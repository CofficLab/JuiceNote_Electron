<template>
  <div v-bind:href="href" v-on:click="go" v-bind:class="shouldActive(href) ? 'active tab-active' : ''">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  props: ["href"],
  methods: {
    shouldActive: function (id: string) {
      return RouteController.getCurrentPage().id == id;
    },
    go: function () {
      this.active = true;
      RouteController.goto(this.href);
    },
  },
});
</script>
