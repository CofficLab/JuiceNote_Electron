<template>
  <draggable :disabled="drag_disabled" :list="list" item-key="name" class="flex flex-col gap-3" ghost-class="btn-ghost" @end="dragEnd"
    ><template #item="{ element }">
      <Link class="btn-sm btn flex gap-4" :node="element">{{ element.title }}</Link>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable/src/vuedraggable";
import Link from "./Link.vue";
import { Node } from "../entities/Node";
import { ref } from "vue";

const props = defineProps({
  list: {
    type: Array<Node>,
    required: true
  },
  drag_disabled: {},
});

const list = ref(props.list)

let dragEnd = function () {
  Node.updateChildrenPriority(props.list);

  window.dispatchEvent(new Event("nodeUpdated"));
  list.value = props.list
};
</script>
