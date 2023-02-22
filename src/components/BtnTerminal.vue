<template>
  <div class="dropdown dropdown-end w-0 bg-red-300 mt-12" v-bind:class="{ 'dropdown-open': open == true }">
    <label class="swap" v-bind:class="{ 'swap-active': open }">
      <div class="swap-on -translate-x-96 mr-96">
        <Terminal></Terminal>
      </div>
    </label>
  </div>

  <button
    tabindex="0"
    class="btn m-1 btn-sm btn-ghost my-auto items-center tooltip tooltip-left flex"
    data-tip="打开终端"
    v-bind:onClick="click"
    v-bind:class="{ 'btn-active': open }"
  >
    <CommandLine></CommandLine>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandLine from "../icons/command-line.vue";
import Terminal from "../components/Terminal.vue";

export default defineComponent({
  components: {
    CommandLine,
    Terminal,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    click() {
      this.open = !this.open;
    },
  },
});
</script>
