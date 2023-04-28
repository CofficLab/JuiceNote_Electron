<template>
  <div>
    <LessonAside class="hidden lg:flex"></LessonAside>

    <main class="lg:pl-40">
      <slot></slot>
    </main>

    <!-- 弹层 -->
    <RightMenuModal></RightMenuModal>
    <FormAdd></FormAdd>
    <FormRename></FormRename>
    <Terminal></Terminal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LessonAside from "./LessonAside.vue";
import FormAdd from "../modals/FormAdd.vue";
import FormRename from "../modals/FormRename.vue";
import RightMenuModal from "../modals/RightMenuModal.vue";
import Terminal from "../modals/Terminal.vue";
</script>
