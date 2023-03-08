<template>
  <div>
    <div class="dropdown dropdown-end dropdown-hover">
      <label tabindex="0"
        ><div class="btn-ghost btn-sm btn my-auto flex w-12 items-center">
          <ChevronDoubleDown></ChevronDoubleDown></div
      ></label>
      <ul tabindex="0" class="dropdown-content z-50 flex w-12 flex-col gap-4 rounded-2xl bg-base-100 py-2 shadow">
        <li><BtnDelete></BtnDelete></li>
        <li><Add :showText="false" class="h-12 w-12"></Add></li>
        <li><Edit :showText="false" class="h-12 w-12"></Edit></li>
        <li><BtnCopy></BtnCopy></li>
        <li><BtnGitCommit></BtnGitCommit></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChevronDoubleDown from "../../assets/icons/chevron-double-down.svg";
import BtnCopy from "./BtnCopy.vue";
import BtnDelete from "./BtnDelete.vue";
import BtnGitCommit from "./BtnGitCommit.vue";
import Edit from "../operators/Edit.vue";
import Add from "../operators/Add.vue";

export default defineComponent({
  components: {
    ChevronDoubleDown,
    BtnCopy,
    BtnDelete,
    Add,
    Edit,
    BtnGitCommit,
  },
});
</script>

<style scoped lang="postcss">
ul li {
  @apply flex justify-center;
}
</style>
