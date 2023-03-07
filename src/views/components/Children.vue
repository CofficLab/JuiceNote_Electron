<template>
  <draggable
    :disabled="drag_disabled"
    :list="list"
    item-key="name"
    class="flex flex-col gap-3"
    ghost-class="btn-ghost"
    @end="dragEnd"
    ><template #item="{ element }">
      <Link class="btn flex gap-4" v-bind:id="element.id" :current="current">{{ element.title }}</Link>
    </template>
  </draggable>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable/src/vuedraggable";
import RouteController from "../../controllers/RouteController";
import Node from "../../models/Node";
import Link from "./Link.vue";

export default defineComponent({
  props: {
    current: { type: Node, required: true },
    list: {},
    drag_disabled: {},
  },
  order: 0,
  components: {
    draggable,
    Link,
  },
  methods: {
    dragEnd() {
      return RouteController.setChildrenIds(this.list);
    },
  },
});
</script>
