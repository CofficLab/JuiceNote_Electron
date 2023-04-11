<template>
  <div class="h-screen w-full overflow-scroll overscroll-none bg-sky-400/10 py-8">
    <div class="mx-auto grid max-w-screen-2xl grid-cols-3 gap-4 p-12 py-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <template v-for="book in books">
        <Book :book="book"></Book>
      </template>

      <div class="h-24"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Node } from "../../models/Node";
import Book from "../components/Book.vue";

const route = useRoute();
const books = computed(() => {
  if (route.name == "home.edit") {
    return Node.getBooks();
  }

  return Node.getVisibleBooks();
});
</script>
