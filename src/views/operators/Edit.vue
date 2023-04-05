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
const editable = computed(() => route.name == "lessons.edit");
const toggleEditable = function () {
  RightMenuController.hide();
  if (editable.value == true) {
    router.push({ name: "lessons.show", params: { id: route.params.id } });
  } else {
    router.push({ name: "lessons.edit", params: { id: route.params.id } });
  }
};
</script>
