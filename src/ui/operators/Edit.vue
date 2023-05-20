<template>
  <div @click="toggleEditable">
    <PencilSquare v-if="!editable"></PencilSquare>
    <ArrowUturnLeft v-if="editable"></ArrowUturnLeft>
    <span v-if="showText">{{ editable ? "退出编辑" : "编辑" }}</span>
  </div>
</template>

<script setup>
import PencilSquare from "../icons/IconEdit.vue";
import ArrowUturnLeft from "../icons/IconArrowUturnLeft.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

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

const router = useRouter();
const route = useRoute();
const editable = computed(() => {
  return route.name == "nodes.edit" || route.name == "home.edit";
});
const toggleEditable = function () {
  if (route.name == "nodes.edit") {
    router.push({ name: "nodes.show", params: { id: route.params.id } });
  } else if (route.name == "nodes.show") {
    router.push({ name: "nodes.edit", params: { id: route.params.id } });
  } else if (route.name == "home.show") {
    router.push({ name: "home.edit" });
  } else if (route.name == "home.edit") {
    router.push({ name: "home.show" });
  }
};
</script>
