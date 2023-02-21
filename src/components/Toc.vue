<template>
  <div class="h-full overflow-scroll flex flex-col gap-4 items-end py-4 mr-4 pb-48">
    <!-- 其他编程语言 -->
    <ul class="menu shadow-xl bg-cyan-800/10 rounded-2xl w-56 mt-2" v-show="menus.length > 1">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.getBook().name }}</Link>
      </li>
    </ul>

    <!-- TOC -->
    <div class="table-of-contents overflow-scroll w-56 bg-base-200/90 rounded-2xl" v-html="toc"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import BookController from "../controllers/BookController";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    toc(): string {
      let current = RouteController.getCurrentPage();
      return current.toc();
    },
    menus: function () {
      let menus = BookController.search(RouteController.getCurrentPage().name);

      menus = menus.filter(function (menu) {
        return menu.getParent().name == RouteController.getCurrentPage().getParent().name;
      });

      return menus;
    },
  },
  mounted: function () {
    // 监听滚动的距离以高亮toc菜单
    window.addEventListener("scroll", function (e) {
      if (!e.target) return;

      // 已经滚动了多少距离
      var scrollTop = e.target.scrollingElement.scrollTop;
      // 正文DOM
      var proseDom = document.getElementsByClassName("prose").item(0);
      // 正文里的标题
      var titleDoms = proseDom?.querySelectorAll("h2,h3,h4");
      if (!titleDoms) return;

      for (var i = 0; i < titleDoms.length; i++) {
        var title = titleDoms.item(i);
        if (!title) return;

        // 当前标题离顶部的距离
        var offsetTop = title.offsetTop;
        if (scrollTop - offsetTop > 0 && scrollTop - offsetTop < 20) {
          var aDoms = document.getElementsByClassName("table-of-contents").item(0)?.getElementsByTagName("a");
          if (!aDoms) return;

          for (var j = 0; j < aDoms.length; j++) {
            var a = aDoms.item(j);
            if (a != null && a.attributes["href"].nodeValue == "#" + title?.id) {
              a.classList.add("bg-sky-300/30");
            } else {
              a?.classList.remove("bg-sky-300/30");
            }
          }
        }
      }
    });
  },
  components: { Link },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-2xl shadow-xl !important;

  ul {
    @apply w-full relative hover:bg-transparent  !important;

    li {
      @apply m-2 w-full h-full rounded;

      a {
        @apply no-underline rounded-lg z-0 h-full w-full p-2 block hover:bg-sky-300/30;
      }
    }
  }
}
</style>
