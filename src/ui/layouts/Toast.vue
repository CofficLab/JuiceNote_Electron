<template>
  <div class="alert alert-success fixed top-0 z-50 h-8 rounded-sm" v-show="message.length > 0">
    <span class="mx-auto" v-html="message"></span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Toast from "../entities/Toast";

const message = computed(() => Toast.toast);
</script>
