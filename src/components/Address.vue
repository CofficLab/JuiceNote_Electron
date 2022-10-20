<template>
  <div class="flex flex-row gap-4">
    <span class="my-auto text-red-900">{{ path }}</span>
    <span class="my-auto text-yellow-900">{{ current.id }}</span>
  </div>
</template>

<script lang="ts">
import { unescape } from "querystring";
import { defineComponent } from "vue";
import store from "../models/store";

export default defineComponent({
  computed: {
    path: function () {
      return this.$route.path;
    },
    current: function () {
      return store.current(unescape(this.$route.path));
    },
  },
  beforeCreate: function () {
    // console.log("before address created,current route path is", this.$route.path);
  },
  created() {
    // console.log("address created,current route path is", this.$route.path);
  },
  mounted() {
    // console.log("address mounted,current route path is", this.$route.path);
  },
});
</script>
