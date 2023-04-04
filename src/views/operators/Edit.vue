<template>
  <div @click="toggleEditable">
    <PencilSquare v-if="!editable"></PencilSquare>
    <ArrowUturnLeft v-if="editable"></ArrowUturnLeft>
    <span v-if="showText">{{ editable ? "退出编辑" : "编辑" }}</span>
  </div>
</template>

<script setup>
import RightMenuController from "../../controllers/RightMenuController";
import PencilSquare from "../../assets/icons/pencil-square.svg";
import ArrowUturnLeft from "../../assets/icons/arrow-uturn-left.svg";
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
const editable = computed(() => route.query.editable == 1);
const toggleEditable = function () {
  RightMenuController.hide();
  router.push({
    path: "/lessons/" + route.params.id + "/edit",
    query: {
      editable: Math.abs((route.query.editable ?? 0) - 1),
    },
  });
};
</script>
