<template>
  <draggable
    :disabled="drag_disabled"
    :list="list"
    item-key="name"
    class="flex flex-col gap-3"
    ghost-class="btn-ghost"
    @end="dragEnd"
    ><template #item="{ element }">
      <Link class="btn flex gap-4" :id="element.id" :node="current">{{ element.title }}</Link>
    </template>
  </draggable>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable/src/vuedraggable";
import NodeController from "../../controllers/NodeController";
import { Node } from "../../models/Node";
import Link from "./Link.vue";

export default defineComponent({
  props: {
    current: { type: Node, required: true },
    list: { type: Array, required: true },
    drag_disabled: {},
  },
  order: 0,
  components: { draggable, Link },
  methods: {
    dragEnd() {
      return NodeController.updateChildrenPriority(this.list);
    },
  },
});
</script>
