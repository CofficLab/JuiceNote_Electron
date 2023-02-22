<template>
  <div>
    <button v-on:click="del" class="btn-sm btn btn-ghost my-auto tooltip tooltip-bottom" data-tip="删除章节或页面">
      <Trash></Trash>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Trash from "../icons/trash.vue";

export default defineComponent({
  methods: {
    del: function () {
      let current = store.current;
      store.delete(current);
    },
  },
  components: { Trash },
});
</script>
