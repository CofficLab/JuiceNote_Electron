<template>
  <draggable :list="list" item-key="name" class="flex flex-col gap-3" ghost-class="btn-ghost" @end="checkEnd"
    ><template #item="{ element }">
      <div class="btn">{{ element.name }}</div>
    </template>
  </draggable>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable/src/vuedraggable";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  props: ["list"],
  order: 0,
  components: {
    draggable,
  },
  methods: {
    checkEnd: function () {
      RouteController.setChildrenIds(this.list);
    },
  },
});
</script>
