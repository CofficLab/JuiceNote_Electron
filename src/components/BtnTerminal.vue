<template>
  <div class="dropdown dropdown-end mt-12 w-0 bg-red-300" v-bind:class="{ 'dropdown-open': open == true }">
    <label class="swap mr-96" v-bind:class="{ 'swap-active': open }">
      <div class="swap-on mr-96 -translate-x-96">
        <Terminal v-if="open"></Terminal>
      </div>
    </label>
  </div>

  <button
    tabindex="0"
    class="btn-ghost tooltip tooltip-left btn-sm btn m-1 my-auto flex items-center"
    data-tip="打开终端"
    v-bind:onClick="click"
    v-bind:class="{ 'btn-active': open }"
  >
    <CommandLine></CommandLine>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandLine from "../assets/icons/command-line.svg";
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
