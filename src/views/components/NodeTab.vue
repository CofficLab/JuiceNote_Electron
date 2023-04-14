<template>
  <div class="tabs-container" v-if="current.getParent().isTab">
    <Link v-for="sibling in current.getSiblings()" class="tab" :node="sibling">{{ sibling.title }}</Link>
  </div>

  <div class="tabs-container" v-if="current.isTab">
    <Link v-for="child in current.getChildren()" class="tab tab-lifted" :node="child">{{ child.title }}</Link>
  </div>
</template>

<script setup lang="ts">
import Link from "../components/Link.vue";
const props = defineProps({
  current: null,
});
</script>

<style lang="postcss">
.tabs-container {
  @apply tabs tabs-boxed mt-0 flex w-11/12 mx-auto justify-center bg-lime-100/90;
}
</style>
