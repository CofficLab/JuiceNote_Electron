<template>
  <div class="h-screen w-full overflow-scroll overscroll-none bg-sky-400/10 py-8">
    <div class="mx-auto grid max-w-screen-2xl grid-cols-3 gap-4 p-12 py-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

<script setup>
import { computed, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import Book from "../components/Book.vue";
import NodeController from "../../controllers/NodeController";

console.log("加载pages.home");

const route = useRoute();
let booksVisible = computed(() => NodeController.getBooks().filter((book) => book.isVisible));
let books = computed(() => NodeController.getBooks());

onBeforeRouteUpdate((to, from) => {
  console.log("pages.home，路由发生了变化");
});
</script>
