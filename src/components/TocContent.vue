<template>
  <div class="flex h-full flex-col items-end gap-4 overflow-scroll">
    <div class="table-of-contents w-56 overflow-scroll rounded-2xl bg-cyan-800/10" v-html="markdown"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Link from "./Link.vue";

// const toc = require("markdown-toc");
// const toc = require("toc-extract");
import Toc from "toc-maker";

export default defineComponent({
  props: ["markdown"],
  computed: {
    html() {
      // console.log("get toc");
      // console.log(document.querySelector("#viewer")?.innerHTML);
      // console.log(new Toc(document.querySelector("#viewer")).tocEl);
      // return toc(this.markdown, { selectors: "h1" });
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
