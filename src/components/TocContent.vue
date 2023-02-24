<template>
  <div class="flex h-full flex-col items-end gap-4 overflow-scroll">
    <div class="table-of-contents w-56 overflow-scroll rounded-2xl bg-cyan-800/10" v-html="html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "toc-maker";
import RouteController from "../controllers/RouteController";

export default defineComponent({
  computed: {
    html() {
      let renderedHtml = RouteController.renderedHtml;
      if (renderedHtml.length > 0) {
        let renderedDom = document.createElement("div");
        renderedDom.innerHTML = renderedHtml;
        return new Toc(renderedDom).tocEl.innerHTML;
      }

      return "";
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
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-2xl shadow !important;

  ul {
    @apply relative w-full hover:bg-transparent  !important;

    li {
      @apply m-2 h-full w-full rounded;

      a {
        @apply z-0 block h-full w-full rounded-lg p-2 no-underline hover:bg-sky-300/30;
      }
    }
  }
}
</style>
