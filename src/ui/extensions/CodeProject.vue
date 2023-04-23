<template>
  <node-view-wrapper class="relative flex flex-row overflow-auto rounded" contenteditable="false">
    <div class="flex w-full flex-row min-h-96 h-96" contenteditable="false">
      <ul class="file-list" contenteditable="false" v-if="files.length > 1 || editable">
          <li v-for="file in files" :class="{ 'bg-gray-500': file.id==selectedId, 'bg-gray-700': file.id != selectedId }"
              @click="activate(file.id)">{{ file.title }}
          </li>
      </ul>

      <div class="flex w-full flex-col shadow-sm">
        <Monaco :code="getContent" :showRunButton="node.attrs.run == 1" :keyUpCallback="keyup" :showLineNumbers="true"></Monaco>
        <node-view-content ref="contents" :data-current="current" class="code-editor-container bg-red-400/40 p-0"></node-view-content>
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
const database = JSON.parse(props.node.attrs.data)
const files = computed(()=> database)
const selectedId = ref(1)
console.log(files.value)

const activate = function (id) {
  console.log("激活节点", id);
  selectedId.value = id
};

const getContent = computed(()=> {
  let content = files.value.find(file => file.id == selectedId.value).content
  return content
})

const keyup = function(value) {
  console.log("更新代码块的内容为", value);
}
</script>

<style lang="postcss" scoped>
.file-list {
  @apply tabs flex w-1/12 flex-col overflow-hidden rounded-none p-0 m-0 text-sm bg-slate-700 gap-0 items-start;

  li {
    @apply m-0 pl-4 cursor-pointer flex flex-nowrap whitespace-nowrap rounded-none text-gray-300 no-underline outline-none w-full focus-visible:outline-none dark:text-gray-200;;
  }
}
</style>
