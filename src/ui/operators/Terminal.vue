<template>
  <div @click="click">
    <CommandLine v-if="showIcon"></CommandLine>
    <span v-if="showText">显示终端</span>
  </div>
</template>

<script lang="ts" setup>
import CommandLine from "../icons/IconCommandLine.vue";

const props = defineProps({
  showText: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
});

const click = () => dispatchEvent(new Event("toggle-terminal"));
</script>
