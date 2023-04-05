<template>
  <div class="tabs-container" v-if="current.getParent().isTab">
    <Link v-for="sibling in current.getSiblings()" class="tab-lifted tab" :node="sibling">{{ sibling.title }}</Link>
  </div>

  <div class="tabs-container" v-if="current.isTab">
    <Link v-for="child in current.getChildren()" class="tab-lifted tab" :node="child">{{ child.title }}</Link>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Link from "../components/Link.vue";
const props = defineProps({
  current: null,
});
</script>

<style lang="postcss">
.tabs-container {
  @apply tabs mt-0 flex w-full justify-center bg-yellow-400/10;
}
</style>
