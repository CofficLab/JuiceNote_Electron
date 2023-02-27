<template>
  <node-view-wrapper>
    <div class="m-1 flex flex-col rounded-2xl border-2 border-black bg-yellow-400 dark:bg-yellow-600/50">
      <div class="flex justify-between pl-4">
        <div>
          <div class="alert alert-info rounded-none py-0">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="h-6 w-6 flex-shrink-0 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>官网</span>
            </div>
          </div>
        </div>
      </div>
      <node-view-content class="mx-4 mt-2 mb-4 border border-dashed border-cyan-900 p-1" />
    </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
  },

  props: nodeViewProps,
};
</script>
