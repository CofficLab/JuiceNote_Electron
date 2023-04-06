<template>
  <div class="w-full">
    <div class="grid grid-cols-3 gap-4 bg-sky-400/10 p-12 md:grid-cols-4 xl:grid-cols-5">
      <template v-for="book in books">
        <Book :book="book"></Book>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Node } from "../../models/Node";
import Book from "../components/Book.vue";

const books = computed(() => Node.getBooks());
</script>
