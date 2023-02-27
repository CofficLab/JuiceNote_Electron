<template>
  <node-view-wrapper>
    <div class="banner">
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
              <span>提示框</span>
            </div>
          </div>
        </div>
      </div>
      <node-view-content class="mx-4 border border-dashed px-4 dark:border-cyan-800" />
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
