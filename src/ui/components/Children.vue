<template>
  <draggable :disabled="drag_disabled" :list="list" item-key="name" class="flex flex-col gap-3" ghost-class="btn-ghost" @end="dragEnd"
    ><template #item="{ element }">
      <Link class="btn flex gap-4" :node="element">{{ element.title }}</Link>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable/src/vuedraggable";
import NodeController from "../controllers/NodeController";
import { Node } from "../../models/Node";
import Link from "./Link.vue";

const props = defineProps({
  current: { type: Node, required: true },
  list: { type: Array<Node>, required: true },
  drag_disabled: {},
});

let dragEnd = function () {
  NodeController.updateChildrenPriority(props.list);
};
</script>
