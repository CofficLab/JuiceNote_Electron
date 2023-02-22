<template>
  <div>
    <div class="dropdown dropdown-hover dropdown-end">
      <label tabindex="0"
        ><div class="btn-sm btn btn-ghost my-auto flex items-center">
          <ChevronDoubleRight></ChevronDoubleRight></div
      ></label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-18 gap-4">
        <li class="p-0"><BtnDelete class="p-0 m-0"></BtnDelete></li>
        <li class="p-0"><BtnAdd class="p-0 m-0"></BtnAdd></li>
        <li class="p-0"><BtnEdit class="p-0 m-0"></BtnEdit></li>
        <li class="p-0"><BtnGitCommit class="p-0 m-0"></BtnGitCommit></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChevronDoubleRight from "../icons/chevron-double-right.vue";
import BtnAdd from "./BtnAdd.vue";
import BtnDelete from "./BtnDelete.vue";
import BtnEdit from "./BtnEdit.vue";
import BtnGitCommit from "./BtnGitCommit.vue";

export default defineComponent({
  components: {
    ChevronDoubleRight,
    BtnDelete,
    BtnAdd,
    BtnEdit,
    BtnGitCommit,
  },
});
</script>
