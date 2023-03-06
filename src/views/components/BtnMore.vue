<template>
  <div>
    <div class="dropdown-hover dropdown dropdown-end">
      <label tabindex="0"
        ><div class="btn-ghost btn-sm btn my-auto flex items-center">
          <ChevronDoubleDown></ChevronDoubleDown></div
      ></label>
      <ul tabindex="0" class="dropdown-content z-50 flex w-12 flex-col gap-4 rounded-2xl bg-base-100 py-2 shadow">
        <li><BtnDelete></BtnDelete></li>
        <li><BtnAdd></BtnAdd></li>
        <li><BtnEdit></BtnEdit></li>
        <li><BtnCopy></BtnCopy></li>
        <li><BtnGitCommit></BtnGitCommit></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChevronDoubleDown from "../../assets/icons/chevron-double-down.svg";
import BtnAdd from "./BtnAdd.vue";
import BtnCopy from "./BtnCopy.vue";
import BtnDelete from "./BtnDelete.vue";
import BtnEdit from "./BtnEdit.vue";
import BtnGitCommit from "./BtnGitCommit.vue";

export default defineComponent({
  components: {
    ChevronDoubleDown,
    BtnCopy,
    BtnDelete,
    BtnAdd,
    BtnEdit,
    BtnGitCommit,
  },
});
</script>

<style scoped lang="postcss">
ul li {
  @apply flex justify-center;
}
</style>
