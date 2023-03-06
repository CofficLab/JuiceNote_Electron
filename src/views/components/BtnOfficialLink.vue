<template>
  <div class="hidden" id="official-link-button">
    <div class="dropdown-hover dropdown dropdown-end">
      <label tabindex="0"
        ><div class="btn-ghost btn-sm btn my-auto flex items-center">
          <ArrowTopRightOnSquare></ArrowTopRightOnSquare></div
      ></label>
      <ul
        tabindex="0"
        id="official-link-box"
        class="dropdown-content menu flex w-24 flex-col gap-4 bg-base-100 py-2 shadow"
      ></ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArrowTopRightOnSquare from "../../assets/icons/arrow-top-right-on-square.svg";

export default defineComponent({
  components: {
    ArrowTopRightOnSquare,
  },
});
</script>
