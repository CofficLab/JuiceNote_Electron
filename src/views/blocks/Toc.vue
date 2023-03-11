<template>
  <div class="mr-2 flex h-full w-full flex-col items-end gap-4 overflow-scroll">
    <div class="table-of-contents overflow-x-clip overflow-y-scroll" v-html="html"></div>

    <ul style="padding-left: 0">
      <div v-for="(heading, index) in headings">
        <li :class="`toc__item--${heading.level}`" class="list-none rounded-none" style="margin: 0" :key="index">
          <a :href="`#${heading.id}`" class="no-underline">
            <!-- <DynamicPadding :count="heading.level - 1"></DynamicPadding> -->
            {{ heading.text }}
          </a>
        </li>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Editor } from "@tiptap/vue-3";
import NodeController from "../../controllers/NodeController";
import Extensions from "../../entities/Extensions";

export default defineComponent({
  props: ["editor"],
  data() {
    return {
      html: "",
      headings: [],
    };
  },
  methods: {
    checkToc() {
      console.log("toc handle update");
      const headings = [];
      const transaction = this.editor.state.tr;

      this.editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          const id = `heading-${headings.length + 1}`;

          if (node.attrs.id !== id) {
            transaction.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              id,
            });
          }

          headings.push({
            level: node.attrs.level,
            text: node.textContent,
            id,
          });
        }
      });

      console.log(headings);
      this.headings = headings;
    },
  },
  watch: {
    editor() {
      if (this.editor != null && this.editor != undefined) {
        this.checkToc();
      }
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
  li {
    @apply list-none;
  }

  a[data-level="1"] {
    @apply hidden;
  }

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
