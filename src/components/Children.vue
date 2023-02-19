<template>
  <draggable :list="list" item-key="name" class="flex flex-col gap-3" ghost-class="btn-ghost" @end="checkEnd"
    ><template #item="{ element }">
      <Link class="flex gap-4 btn" v-bind:href="element.id">{{ element.name }}</Link>
    </template>
  </draggable>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable/src/vuedraggable";
import RouteController from "../controllers/RouteController";
import Link from "./Link.vue";

export default defineComponent({
  props: ["list"],
  order: 0,
  components: {
    draggable,
    Link,
  },
  methods: {
    checkEnd: function () {
      RouteController.setChildrenIds(this.list);
    },
  },
});
</script>
