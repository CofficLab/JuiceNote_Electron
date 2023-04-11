<template>
    <div class="flex w-full items-stretch justify-center overflow-scroll overscroll-none bg-sky-400/10 object-fill py-8">
    <div class="grid max-w-screen-2xl grid-cols-3 gap-4 self-stretch p-12 py-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <template v-for="book in books">
        <Book :book="book"></Book>
      </template>

      <div class="h-24"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Node } from "../../models/Node";
import Book from "../components/Book.vue";

const books = computed(() => Node.getBooks());
</script>
