<template>
  <div class="dropdown-end dropdown mt-12 w-0 bg-red-300" v-bind:class="{ 'dropdown-open': open == true }">
    <label class="swap mr-96" v-bind:class="{ 'swap-active': open }">
      <div class="swap-on mr-96 -translate-x-96">
        <Terminal v-if="open"></Terminal>
      </div>
    </label>
  </div>

  <button tabindex="0" :class="class" class='tooltip tooltip-left' data-tip="打开终端" v-bind:onClick="click" v-bind:class="{ 'btn-active': open }">
    <CommandLine></CommandLine>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import CommandLine from "../assets/icons/command-line.svg";
import Terminal from "../blocks/Terminal.vue";

const props = defineProps({
  class: String,
});

const open = ref(false);

const click = function () {
  open.value = !open.value;
};
</script>
