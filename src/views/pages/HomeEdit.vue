<template>
  <div class="w-full">
    <div class="grid grid-cols-3 gap-4 bg-sky-400/10 p-12 md:grid-cols-4 xl:grid-cols-5">
      <router-link :to="'/lessons/' + book.id + '/show'" v-for="book in books">
        <div class="card w-56 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-yellow-700">{{ book.title }}</h2>
            <div class="dropdown-left dropdown absolute top-1 right-0">
              <label tabindex="0" class="btn-ghost btn m-1">...</label>
              <ul tabindex="0" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
                <li>
                  <ChangeCover :node="book"></ChangeCover>
                </li>
              </ul>
            </div>
          </div>
          <figure class="max-h-40 rounded-t-xl">
            <img v-if="!book.cover" src="/images/book.png" />
            <img v-else :src="'data:image/png;base64,' + book.cover" class="object-none" />
          </figure>
        </div>
      </router-link>
    </div>

    <ChangeCover></ChangeCover>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Node } from "../../models/Node";
import ChangeCover from "../modals/ChangeCover.vue";

const books = computed(() => Node.getBooks());
</script>
