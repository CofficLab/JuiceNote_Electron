<template>
  <ShopLayout
    ><div class="h-screen w-full overflow-scroll overscroll-none py-12">
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <a class="btn-ghost btn text-xl normal-case">商店</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li tabindex="0">
              <a>
                Parent
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
              </a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div class="navbar-end">
          <a class="btn">Get started</a>
        </div>
      </div>

      <div class="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 p-12 py-8 lg:grid-cols-3 xl:grid-cols-4">
        <template v-for="book in booksVisible">
          <Book :book="book"></Book>
        </template>

        <div class="h-24"></div>
      </div></div
  ></ShopLayout>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Book from "../components/Book.vue";
import Node from "../entities/Node";
import ShopLayout from "../layouts/ShopLayout.vue";

const route = useRoute();
let booksVisible = computed(() => {
  return Node.getBooks().filter((book) => book.isVisible);
});

let books = computed(() => NodeController.getBooks());
</script>
