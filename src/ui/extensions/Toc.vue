<template>
  <node-view-wrapper class="toc">
    <ul style="padding-left: 0">
      <div v-for="(heading, index) in headings">
        <li class="list-none rounded-none text-sm" style="margin: 0" :key="index">
          <router-link :to="getLink(heading)" class="no-underline">
            <DynamicPadding :count="heading.level - 1"></DynamicPadding>
            {{ heading.text }}
          </router-link>
        </li>
      </div>
    </ul>
  </node-view-wrapper>
</template>

<script setup>
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import DynamicPadding from "../components/DynamicPadding.vue";
import { useRoute } from "vue-router";
import { onMounted, nextTick, ref } from "vue";

const route = useRoute();

const props = defineProps({
  nodeViewProps,
});

let headings = ref([]);

let getLink = function (heading) {
  return route.path + `#${heading.id}`;
};

let handleUpdate = function () {
  // console.log("toc handle update");
  headings.value = [];
  const transaction = props.editor.state.tr;

  props.editor.state.doc.descendants((node, pos) => {
    if (node.type.name === "heading") {
      const id = `heading-${headings.value.length + 1}`;

      if (node.attrs.id !== id) {
        transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          id,
        });
      }

      headings.value.push({
        level: node.attrs.level,
        text: node.textContent,
        id,
      });
    }
  });

  transaction.setMeta("addToHistory", false);
  transaction.setMeta("preventUpdate", true);

  props.editor.view.dispatch(transaction);
};

onMounted(() => {
  // console.log("toc mounted");
  props.editor.on("update", handleUpdate);
  nextTick(() => handleUpdate());

  // 监听滚动的距离以高亮toc菜单
  document.querySelector("main").addEventListener("scroll", function (e) {
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
        if (!aDoms) {
          return;
        }

        for (var j = 0; j < aDoms.length; j++) {
          var a = aDoms.item(j);
          if (a != null && a.attributes["href"].nodeValue == "#" + route.path + "#" + title?.id) {
            a.classList.add("bg-sky-300/30");
          } else {
            a?.classList.remove("bg-sky-300/30");
          }
        }
      }
    }
  });
});
</script>

<style lang="postcss" scoped>
.toc {
  @apply hidden lg:flex;
  ul {
    @apply menu fixed right-3 top-32 z-30 w-36 overflow-scroll rounded bg-base-300/90 ring-1 backdrop-blur-sm backdrop-filter md:w-40 xl:w-48 2xl:w-56;
  }
}
</style>
