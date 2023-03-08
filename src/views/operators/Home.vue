<template>
  <Link
    :id="0"
    data-tip="首页"
    v-bind:class="current.checkIsHomePage() ? 'btn-disabled' : ''"
    class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center"
    :current="current"
    ><Home></Home
  ></Link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "../../assets/icons/home.svg";
import { Node } from "../../models/Node";
import Link from "../components/Link.vue";

export default defineComponent({
  props: { current: { type: Node, required: true } },
  components: { Home, Link },
});
</script>
