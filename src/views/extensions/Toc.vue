<template>
  <node-view-wrapper class="toc">
    <ul
      class="menu fixed right-4 top-20 w-56 overflow-scroll rounded-2xl bg-cyan-900/10 py-4 dark:bg-base-300"
      style="padding-left: 0"
    >
      <div v-for="(heading, index) in headings">
        <li
          :class="`toc__item--${heading.level}`"
          class="list-none rounded-none"
          style="margin: 0"
          :key="index"
          v-if="heading.level > 1"
        >
          <a :href="`#${heading.id}`" class="no-underline">
            <DynamicPadding :count="heading.level - 1"></DynamicPadding>
            {{ heading.text }}
          </a>
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
  },
};
</script>
