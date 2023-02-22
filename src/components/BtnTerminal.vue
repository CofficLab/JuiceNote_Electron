<template>
  <div class="dropdown dropdown-end">
    <button
      tabindex="0"
      class="btn m-1 btn-sm btn-ghost my-auto items-center tooltip tooltip-left flex"
      data-tip="打开终端"
    >
      <CommandLine></CommandLine>
    </button>
    <div tabindex="0" class="dropdown-content card card-compact w-auto p-2 shadow bg-cyan-900/20 text-primary-content">
      <div class="card-body">
        <Terminal :id="1" :showFlag="true" class="shadow-2xl"></Terminal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../icons/home.vue";
import CommandLine from "../icons/command-line.vue";
import Link from "./Link.vue";
import RouteController from "../controllers/RouteController";
import Terminal from "./Terminal.vue";

export default defineComponent({
  components: {
    Home,
    Link,
    CommandLine,
    Terminal,
  },
  computed: {
    disabled: () => RouteController.isHomePage,
  },
});
</script>
