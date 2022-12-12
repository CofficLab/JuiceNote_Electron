<template>
  <div class="h-full overflow-scroll">
    <!-- 其他编程语言 -->
    <ul class="menu mr-4 shadow bg-base-100/80 rounded-none w-36 mt-2" v-show="menus.length > 1">
      <li v-for="menu in menus">
        <Link v-bind:href="menu.id">{{ menu.book().title }}</Link>
      </li>
    </ul>
    <!-- 官方文档 -->
    <div class="official-link flex flex-col gap-1 w-36 mt-2"></div>

    <div class="table-of-contents overflow-scroll" v-html="toc"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Link from "./Link.vue";

export default defineComponent({
  computed: {
    toc(): string {
      let current = store.current;
      return current.toc();
    },
    menus: function () {
      let menus = store.root.search(store.current.title);

      menus = menus.filter(function (menu) {
        return menu.parent().title == store.current.parent().title;
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
  @apply w-full;

  ul {
    @apply w-full relative hover:bg-transparent !important;

    li {
      @apply m-2 w-full h-full rounded;

      a {
        @apply no-underline rounded-lg z-0 h-full w-full p-2 block hover:bg-sky-300/30;
      }
    }
  }
}
</style>
