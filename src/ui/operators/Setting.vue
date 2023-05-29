<template>
  <router-link to="/setting" class="flex flex-row gap-2">
    <IconSetting :class="'h-6 w-6'" v-if="showIcon"></IconSetting>
    <span v-if="showText">设置</span>
  </router-link>
</template>

<script setup>
import IconSetting from '../icons/IconSetting.vue';


const props = defineProps({
  showText: {
    type: Boolean,
    required: false,
    default: true,
  },
  showIcon: {
    type: Boolean,
    required: false,
    default: true,
  },
});

</script>
