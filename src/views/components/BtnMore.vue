<!-- @format -->

<template>
  <div>
    <div class="dropdown-hover dropdown-end dropdown">
      <label tabindex="0"
        ><div class="btn-ghost btn-sm btn my-auto flex w-12 items-center">
          <ChevronDoubleDown></ChevronDoubleDown></div
      ></label>
      <ul tabindex="0" class="dropdown-content z-50 flex w-12 flex-col gap-4 rounded-2xl bg-base-100 py-2 shadow">
        <li><Delete :showText="false" class="btn-ghost btn-sm btn w-12"></Delete></li>
        <li><CreateChild :showText="false" class="btn-ghost btn-sm btn w-12"></CreateChild></li>
        <li><Edit :showText="false" class="btn-ghost btn-sm btn w-12"></Edit></li>
        <li><Copy :showText="false" class="btn-ghost btn-sm btn w-12"></Copy></li>
        <li><Commit :showText="false" class="btn-ghost btn-sm btn w-12"></Commit></li>
        <li><Visible :showText="false" :node="book" class="btn-ghost btn-sm btn w-12"></Visible></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import ChevronDoubleDown from '../../assets/icons/chevron-double-down.svg';
  import Copy from '../operators/Copy.vue';
  import Delete from '../operators/Delete.vue';
  import Commit from '../operators/Commit.vue';
  import Edit from '../operators/Edit.vue';
  import CreateChild from '../operators/CreateChild.vue';
  import Visible from '../operators/Visible.vue';
  import NodeController from '../../controllers/NodeController';

  const book = computed(() => NodeController.getCurrentPage().getBook());
</script>

<style scoped lang="postcss">
  ul li {
    @apply flex justify-center;
  }
</style>
