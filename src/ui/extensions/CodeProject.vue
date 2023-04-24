<template>
  <node-view-wrapper class="relative flex flex-row overflow-auto rounded" contenteditable="false">
    <div class="min-h-96 flex h-96 w-full flex-row" contenteditable="false">
      <ul class="file-list" contenteditable="false" v-if="files.length > 1 || editable">
        <li v-for="file in files" :class="{ 'bg-gray-500': file.id == selectedId, 'bg-gray-700': file.id != selectedId }" @click="activate(file.id)">{{ file.title }}</li>
      </ul>

      <div class="flex w-full flex-col shadow-sm">
        <node-view-content ref="contents" :data-current="node.attrs.current" class="code-editor-container h-full bg-red-400/40 p-0"></node-view-content>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from "@tiptap/vue-3";
import Monaco from "../components/Monaco.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

const props = defineProps(nodeViewProps);
const route = useRoute();
const contents = ref();
const titlesDom = ref();
const editable = computed(() => route.name == "lessons.edit");
const current = computed(() => props.node.attrs.current);
const database = JSON.parse(props.node.attrs.data);
const files = computed(() => database);
const selectedId = ref(1);
console.log("code project extension", props.extension);
console.log("code project decorations", props.decorations);
console.log("code project selected", props.selected);
console.log("code project node", props.node.content.content[0]);

const activate = function (id) {
  console.log("激活节点", id);
  selectedId.value = id;
};

const getContent = computed(() => {
  let content = files.value.find((file) => file.id == selectedId.value).content;
  return content;
});

const keyup = function (value) {
  console.log("更新代码块的内容为", value);
};
</script>

<style lang="postcss" scoped>
.file-list {
  @apply tabs m-0 flex w-1/12 flex-col items-start gap-0 overflow-hidden rounded-none bg-slate-700 p-0 text-sm;

  li {
    @apply m-0 flex w-full cursor-pointer flex-nowrap whitespace-nowrap rounded-none pl-4 text-gray-300 no-underline outline-none focus-visible:outline-none dark:text-gray-200;
  }
}
</style>
