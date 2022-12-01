<template>
  <button class="btn btn-sm my-auto rounded-none">
    <div class="dropdown dropdown-top dropdown-hover">
      <label tabindex="0"><Plus></Plus></label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 -ml-8">
        <li><a v-on:click="showChapterForm">添加章节</a></li>
        <li><a v-on:click="showPageForm">添加页面</a></li>
      </ul>
    </div>
  </button>

  <!-- 增加章节的弹层 -->
  <div class="modal z-50" v-bind:class="chapterFormSwitcher ? 'modal-open' : ''">
    <div class="modal-box">
      <input
        ref="chapter_title"
        type="text"
        autofocus
        v-model="title"
        @keyup.enter.native="submitPageForm"
        placeholder="输入章节的标题"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <div class="modal-action">
        <label for="my-modal" class="btn" v-on:click="hideChapterForm">取消</label>
        <label for="my-modal" class="btn" v-on:click="submitChapterForm">提交</label>
      </div>
    </div>
  </div>

  <!-- 增加页面的弹层 -->
  <div class="modal z-50" v-bind:class="pageFormSwitcher ? 'modal-open' : ''">
    <div class="modal-box">
      <input
        ref="page_title"
        type="text"
        autofocus
        v-model="title"
        placeholder="输入页面的标题"
        @keyup.enter.native="submitPageForm"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <div class="modal-action">
        <label for="my-modal" class="btn" v-on:click="hidePageForm">取消</label>
        <label for="my-modal" class="btn" v-on:click="submitPageForm">提交</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import Plus from "../icons/plus.vue";

export default defineComponent({
  data() {
    return {
      pageFormSwitcher: false,
      chapterFormSwitcher: false,
      title: "",
    };
  },
  methods: {
    showPageForm() {
      this.pageFormSwitcher = true;
      this.$nextTick(function () {
        (this.$refs.page_title as any).focus();
      });
    },
    showChapterForm() {
      this.chapterFormSwitcher = true;
      this.$nextTick(function () {
        (this.$refs.chapter_title as any).focus();
      });
    },
    hidePageForm() {
      this.pageFormSwitcher = false;
    },
    hideChapterForm() {
      this.chapterFormSwitcher = false;
    },
    submitPageForm() {
      let current = store.current;
      let parent = current.parent();

      if (parent.isEmpty()) return console.error("父节点不存在，无法创建");

      store.goto(store.createChild(parent, this.title).id);
      this.pageFormSwitcher = false;
      this.title = "";
    },
    submitChapterForm() {
      let current = store.current;
      let parent = current.parent();

      if (parent.isEmpty()) return console.error("父节点不存在，无法创建");

      store.goto(store.createChild(parent, this.title).id);
      this.chapterFormSwitcher = false;
      this.title = "";
    },
  },
  components: { Plus },
});
</script>
