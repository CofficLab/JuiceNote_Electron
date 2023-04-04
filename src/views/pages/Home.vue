<template>
  <div>
    <div class="grid grid-cols-3 gap-4 bg-sky-400/10 p-12">
      <router-link :to="'/lessons/' + book.id" v-for="book in books">
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">{{ book.title }}</h2>
          </div>
          <figure class="max-h-40 rounded-t-xl">
            <img v-if="!book.cover" src="/images/book.png" />
            <img v-else :src="'data:image/png;base64,' + book.cover" class="object-none" />
          </figure>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Node } from "../../models/Node";

const books = computed(() => Node.getBooks());
</script>
