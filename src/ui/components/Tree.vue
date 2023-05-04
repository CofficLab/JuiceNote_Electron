<template>
  <draggable :disabled="!draggable" :list="list" item-key="name" class="menu flex flex-col gap-3 bg-base-100" ghost-class="btn-ghost" @end="dragEnd">
    <template #item="{ element }">
        <li tabindex="0">
          <span>{{ element.title }}</span>
          <ul class="bg-base-100" v-for="child in element.getChildren()" v-if="element.getChildren().length > 0">
            <li>
              <Tree :list="child.getChildren()" v-if="child.getChildren().length > 0"></Tree>
            </li>
          </ul>
        </li>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable/src/vuedraggable";
import { Node } from "../entities/Node";

const props = defineProps({
  list: {
    type: Array<Node>,
    required: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  display: {
    type: String,
    default: "tree",
  },
});

let dragEnd = function () {
  Node.updateChildrenPriority(props.list);
};
</script>
