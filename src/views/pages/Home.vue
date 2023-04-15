<template>
  <div class="h-screen w-full overflow-scroll overscroll-none bg-sky-400/10 py-8">
    <div class="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 p-12 py-8 lg:grid-cols-3 xl:grid-cols-4">
      <template v-for="book in booksVisible" v-if="route.name == 'home.show'">
        <Book :book="book"></Book>
      </template>

      <template v-for="book in books" v-if="route.name == 'home.edit'">
        <Book :book="book"></Book>
      </template>

      <div class="h-24"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Book from "../components/Book.vue";
import NodeController from "../../controllers/NodeController";

const route = useRoute();
let booksVisible = computed(() => NodeController.getBooks().filter((book) => book.isVisible));
let books = computed(() => NodeController.getBooks());
</script>
