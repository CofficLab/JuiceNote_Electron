<template>
  <!-- 标题栏，左侧显示红绿灯，右侧可用于拖移 -->
  <div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar"></div>

  <!-- 主要区域 -->
  <main class="bg-green-200/20 flex flex-row z-10 min-h-screen overflow-hidden">
    <!-- 左侧栏 -->
    <div class="w-56">
      <div
        class="bg-gradient-to-r from-base-300/50 to-base-200/90 fixed bottom-10 w-56 py-4"
        v-bind:class="hideTitleBar ? 'top-0' : 'top-8'"
      >
        <Toc v-show="!inEditMode"></Toc>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="flex-grow">
      <div class="fixed left-56 bottom-10 right-0 bg-base-200 pt-4" v-bind:class="hideTitleBar ? 'top-0' : 'top-8'">
        <div class="h-full overflow-scroll scroll-m-48 scroll-p-52">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>

  <footer
    class="h-10 fixed bottom-0 w-full p-0 flex border-t border-slate-500"
    v-bind:class="inEditMode ? 'bg-yellow-300' : 'bg-base-300'"
  >
    <div class="flex justify-center text-center"><Manage></Manage></div>
    <div class="flex justify-center w-full"><Address></Address></div>
    <div>
      <router-link v-bind:to="nextLink" class="btn my-auto w-full pb-3 rounded-none text-center align-middle"
        ><arrow-right-circle></arrow-right-circle
      ></router-link>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toc from "./Toc.vue";
import Content from "./Content.vue";
import store from "../models/store";
import Manage from "./Manage.vue";
import Address from "./Address.vue";
import ArrowRightCircle from "../icons/arrow-right-circle.vue";
import anchor from "markdown-it-anchor";

export default defineComponent({
  components: {
    Toc,
    Content,
    Manage,
    Address,
    ArrowRightCircle,
  },
  computed: {
    hideTitleBar: function () {
      return store.full_screen;
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
    nextLink: function () {
      let activatedNavigators = store.getActivatedNavigators(this.$route.path);
      let current = activatedNavigators.pop();
      if (current === undefined) return "/";
      let next = current.next();

      // console.log("current is ", current.id);
      // console.log("next is ", next);

      return next === null || next == undefined ? "/" : next.link;
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
