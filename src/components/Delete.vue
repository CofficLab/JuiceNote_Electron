<template>
  <button v-on:click="del" class="btn-sm btn btn-ghost my-auto">
    <Trash></Trash>
  </button>
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
