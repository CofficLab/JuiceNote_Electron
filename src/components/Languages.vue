<template>
  <div class="h-full flex overflow-visible mr-8" v-if="menus.length > 1">
    <div class="dropdown dropdown-bottom flex justify-center dropdown-hover">
      <label
        tabindex="0"
        class="self-center rounded p-1 hover:scale-105 duration-200 transition hover:ring-2 ring-primary ring-opacity-30 ring"
        >{{ current.getBook().name }}</label
      >
      <div class="mt-0 pt-4 dropdown-content">
        <ul tabindex="0" class="shadow p-2 gap-2 bg-cyan-900/80 rounded-box w-52 h-56 overflow-y-scroll">
          <Children
            :list="
              menus.map((menu) => {
                menu.name = menu.getBook().name;
                return menu;
              })
            "
          ></Children>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Children from "./Children.vue";
import BookController from "../controllers/BookController";

export default defineComponent({
  computed: {
    current() {
      return RouteController.getCurrentPage();
    },
    menus: function () {
      let menus = BookController.search(RouteController.getCurrentPage().name);

      menus = menus.filter(function (menu) {
        return menu.getParent().name == RouteController.getCurrentPage().getParent().name;
      });

      return menus;
    },
  },
  components: { Children },
});
</script>
