<!-- @format -->

<template>
  <node-view-wrapper class="toc hidden lg:flex">
    <ul class="menu fixed right-4 top-28 w-56 overflow-scroll rounded-2xl bg-cyan-900/10 py-4 dark:bg-base-300" style="padding-left: 0">
      <div v-for="(heading, index) in headings">
        <li class="list-none rounded-none" style="margin: 0" :key="index">
          <router-link :to="`#${heading.id}`" class="no-underline">
            <DynamicPadding :count="heading.level - 1"></DynamicPadding>
            {{ heading.text }}
          </router-link>
        </li>
      </div>
    </ul>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import DynamicPadding from "../components/DynamicPadding.vue";

export default {
  components: {
    NodeViewWrapper,
    DynamicPadding,
  },
  props: nodeViewProps,
  data() {
    return {
      headings: [],
    };
  },

  methods: {
    handleUpdate() {
      // console.log("toc handle update");
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

      transaction.setMeta("addToHistory", false);
      transaction.setMeta("preventUpdate", true);

      this.editor.view.dispatch(transaction);

      this.headings = headings;
    },
  },

  mounted() {
    this.editor.on("update", this.handleUpdate);
    this.$nextTick(this.handleUpdate);

    // 监听滚动的距离以高亮toc菜单
    document.getElementById("editor-container").addEventListener("scroll", function (e) {
      if (!e.target) return;

      // 已经滚动了多少距离
      var scrollTop = e.target.scrollTop;
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
          var aDoms = document.getElementsByClassName("toc").item(0)?.getElementsByTagName("a");
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
};
</script>
