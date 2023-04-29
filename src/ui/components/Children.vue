<template>
  <draggable :disabled="drag_disabled" :list="list" item-key="name" class="flex flex-col gap-3" ghost-class="btn-ghost" @end="dragEnd"
    ><template #item="{ element }">
      <Link class="btn-info btn-sm btn flex gap-4" :node="element">{{ element.title }}</Link>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable/src/vuedraggable";
import Link from "./Link.vue";
import { Node } from "../entities/Node";

const props = defineProps({
  list: { type: Array<Node>, required: true },
  drag_disabled: {},
});

let dragEnd = function () {
  Node.updateChildrenPriority(props.list);
};
</script>
