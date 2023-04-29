<template>
  <div class="flex h-full overflow-visible" v-if="menus.length > 1">
    <div class="dropdown dropdown-bottom dropdown-hover flex justify-center">
      <button tabindex="0" class="btn-ghost tooltip tooltip-left btn-sm btn my-auto" data-tip="查看其他语言的相似内容">
        {{ current.getBook().name }}
      </button>
      <div class="dropdown-content mt-0 pt-4">
        <ul tabindex="0" class="rounded-box w-52 gap-2 overflow-y-scroll bg-cyan-900/80 p-2 shadow">
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
