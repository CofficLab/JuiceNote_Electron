<template>
  <div class="dropdown-hover dropdown-bottom dropdown dropdown-end z-20 pt-8" v-show="show">
    <label tabindex="0" class="btn m-1 w-36">其他编程语言</label>
    <ul tabindex="0" class="dropdown-content menu rounded-box z-30 mr-1 w-36 bg-base-100 p-2 shadow">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.book().title }}</Link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    show: function () {
      return this.menus.length > 0;
    },
    menus: function () {
      let menus = RouteController.root.search(RouteController.getCurrentPage().title);

      menus = menus.filter(function (menu) {
        return (
          menu.parent().title == RouteController.getCurrentPage().parent().title &&
          menu.id != RouteController.getCurrentPage().id
        );
      });
      return menus;
    },
  },
  components: { Link },
});
</script>
