<template>
  <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar"></div>

  <!-- 导航栏，显示图书名和章节名 -->
  <div class="h-12 z-50" v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
    <div class="w-full flex flex-row fixed z-50 shadow-xl">
      <div class="w-56">
        <Books></Books>
      </div>
      <div class="flex-grow h-12 bg-base-300 shadow-2xl">
        <Chapters></Chapters>
      </div>
    </div>
  </div>

  <!-- 主要区域，包含左侧操作和右侧内容 -->
  <main class="bg-green-200/20 flex flex-row z-10 min-h-screen overflow-hidden">
    <!-- 左侧栏 -->
    <div class="w-56">
      <div
        class="bg-gradient-to-r from-base-300/50 to-base-200/90 fixed top-14 bottom-10 w-56 py-4 border-l-4 border-slate-500"
      >
        <Toc v-show="!inEditMode"></Toc>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="flex-grow">
      <div class="fixed left-56 top-20 bottom-10 right-0 bg-base-200 pt-4 border-r-4 border-slate-500">
        <div class="h-full overflow-scroll scroll-m-48 scroll-p-52">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>

  <footer
    class="h-10 fixed bottom-0 w-full p-0 flex border-t-4 border-slate-500"
    v-bind:class="inEditMode ? 'bg-yellow-300' : 'bg-base-300'"
  >
    <div class="flex justify-center text-center"><Manage></Manage></div>

    <!-- 底部地址栏 -->
    <div class="flex justify-center w-full"><Address></Address></div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Books from "./Books.vue";
import Chapters from "./Chapters.vue";
import Toc from "./Toc.vue";
import Content from "./Content.vue";
import store from "../models/store";
import Manage from "./Manage.vue";
import Address from "./Address.vue";

export default defineComponent({
  components: {
    Books,
    Chapters,
    Toc,
    Content,
    Manage,
    Address,
  },
  computed: {
    hideTitleBar: function () {
      return store.full_screen;
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
  },
});
</script>

<style lang="postcss">
.table-of-contents {
  @apply rounded-none mx-auto prose z-10;
  ul {
    @apply list-none pl-1 fixed z-10;

    a {
      @apply no-underline z-0;
    }
  }
}
</style>
