<template>
  <div class="flex w-full">
    <div id="editor" class="flex w-full justify-center"></div>

    <!-- 点击保存按钮时会读取这里的内容 -->
    <textarea class="hidden" id="editor-content" v-text="markdownSourceCode"></textarea>
  </div>
</template>

<script lang="ts">


export default defineComponent({
  data() {
    return {
      markdownSourceCode: RouteController.getCurrentPage().markdownSourceCode(),
    };
  },
  computed: {
    current() {
      return RouteController.getCurrentPage();
    },
  },
  mounted() {
    this.initEditor();
  },
  watch: {
    current() {
      this.initEditor();
    },
  },
  methods: {

      // window.loadMyJS();
    },
  },
  components: { Toc },
});
</script>
