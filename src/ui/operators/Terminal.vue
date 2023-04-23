<template>
  <div @click="click">
    <CommandLine v-if="showIcon"></CommandLine>
    <span v-if="showText">显示终端</span>
  </div>
</template>

<script lang="ts" setup>
import CommandLine from "../assets/icons/command-line.svg";

const props = defineProps({
  showText: Boolean,
  showIcon: {
    type: Boolean,
    default: true
  },
});

const click =  () => dispatchEvent(new Event('toggle-terminal'))
</script>
