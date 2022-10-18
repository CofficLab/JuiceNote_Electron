<template>
  <button v-on:click="del" class="btn my-auto w-full pb-3 rounded-none text-center align-middle">
    <Trash></Trash>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Trash from "../icons/trash.vue";

export default defineComponent({
  methods: {
    del: function () {
      let current = store.getCurrent(this.$route.path);
      this.$router.push(current.getParent()?.link);
      store.deleteNavigator(current);
    },
  },
  components: { Trash },
});
</script>
