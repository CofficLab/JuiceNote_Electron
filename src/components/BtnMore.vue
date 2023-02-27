<template>
  <div>
    <div class="dropdown-hover dropdown dropdown-end">
      <label tabindex="0"
        ><div class="btn-ghost btn-sm btn my-auto flex items-center">
          <ChevronDoubleDown></ChevronDoubleDown></div
      ></label>
      <ul tabindex="0" class="dropdown-content flex w-12 flex-col gap-4 bg-base-100 py-2 shadow">
        <li class="p-0"><BtnDelete class="m-0 p-0"></BtnDelete></li>
        <li class="p-0"><BtnAdd class="m-0 p-0"></BtnAdd></li>
        <li class="p-0"><BtnEdit class="m-0 p-0"></BtnEdit></li>
        <li class="p-0"><BtnCopy class="m-0 p-0"></BtnCopy></li>
        <li class="p-0"><BtnGitCommit class="m-0 p-0"></BtnGitCommit></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChevronDoubleDown from "../icons/chevron-double-down.vue";
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
