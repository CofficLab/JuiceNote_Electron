<template>
  <div class="dropdown dropdown-hover dropdown-bottom dropdown-end z-20 pt-8" v-show="show">
    <label tabindex="0" class="btn m-1 w-36">其他编程语言</label>
    <ul tabindex="0" class="dropdown-content menu p-2 mr-1 shadow w-36 bg-base-100 rounded-box z-30">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.book().title }}</Link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    show: function () {
      return this.menus.length > 0;
    },
    menus: function () {
      let menus = store.root.search(store.current.title);

      menus = menus.filter(function (menu) {
        return menu.parent().title == store.current.parent().title && menu.id != store.current.id;
      });
      return menus;
    },
  },
  components: { Link },
});
</script>
