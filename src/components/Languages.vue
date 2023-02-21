<template>
  <div class="h-full flex overflow-visible" v-if="menus.length > 1">
    <div class="dropdown dropdown-bottom flex justify-center dropdown-hover">
      <button tabindex="0" class="btn btn-sm my-auto btn-ghost tooltip tooltip-left" data-tip="查看其他语言的相似内容">
        {{ current.getBook().name }}
      </button>
      <div class="mt-0 pt-4 dropdown-content">
        <ul tabindex="0" class="shadow p-2 gap-2 bg-cyan-900/80 rounded-box w-52 overflow-y-scroll">
          <Children
            :drag_disabled="true"
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

      // 只关注和当前页面的章节名称一样的
      menus = menus.filter(function (menu) {
        return menu.getParent().name == RouteController.getCurrentPage().getParent().name;
      });

      return menus;
    },
  },
  components: { Children },
});
</script>
