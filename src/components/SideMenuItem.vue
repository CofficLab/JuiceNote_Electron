<template>
  <li v-if="item.isLeaf()">
    <Link class="flex gap-4" v-bind:href="item.id">
      <span class="flex-1">{{ item.title }}</span>
    </Link>
  </li>

  <li class="menu-title" v-if="item.notLeaf()">
    <span>{{ item.title }}</span>
  </li>

  <li v-for="sub in item.children" v-if="item.notLeaf()">
    <Link class="flex gap-4" v-bind:href="sub.id">
      <span class="flex-1">{{ sub.title }}</span>
    </Link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";

export default defineComponent({
  components: { Link },
  props: ["item"],
});
</script>
