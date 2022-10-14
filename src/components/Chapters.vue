<template>
  <div class="dropdown w-96">
    <label tabindex="0" class="btn btn-ghost m-0 w-full rounded-none flex flex-row justify-between h-full">
      <h1 v-html="title" class="place-self-center my-auto text-xl"></h1>
      <svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
      </svg>
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 mt-0 shadow-2xl bg-base-200 z-50 w-full rounded-b-3xl">
      <li v-for="navigator in activeNavigator.children">
        <router-link v-bind:to="getLink(navigator.name)" v-text="navigator.title" active-class="active"> </router-link>
      </li>
      <hr class="mb-4" />
      <li>
        <label for="my-modal" class="btn modal-button" v-on:click="showForm">增加章节</label>
      </li>
    </ul>
  </div>

  <!-- 弹层 -->
  <div class="modal" v-bind:class="showModal ? 'modal-open' : ''">
    <div class="modal-box">
      <input
        id="title"
        ref="title"
        type="text"
        autofocus
        v-model="form.title"
        placeholder="输入标题"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <div class="modal-action">
        <label for="my-modal" class="btn" v-on:click="hideForm">取消</label>
        <label for="my-modal" class="btn" v-on:click="submit">提交</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nav, navigatorNode } from "../models/nav";
import store from "../models/store";
import path from "path";

export default defineComponent({
  data() {
    return {
      showModal: false,
      form: {
        title: "",
      },
    };
  },
  methods: {
    shouldBeActive(navigator: navigatorNode) {
      return nav.shouldBeActive(navigator, this.$route.path);
    },
    getLink(navigatorName: string) {
      return "/article/" + navigatorName;
    },
    showForm() {
      this.showModal = true;
      this.$nextTick(function () {
        this.$refs.title.focus();
      });
    },
    hideForm() {
      this.showModal = false;
    },
    submit() {
      store.makeNavigator(path.join(nav.getBookName(this.$route.path), this.form.title));
      this.showModal = false;
      console.log(this.$route.path);
      this.$router.push(this.$route.path);
    },
  },
  computed: {
    activeNavigator() {
      return nav.getActiveNavigator(this.$route.path);
    },
    title(): string {
      if (store.sort_mode) {
        return "正在排序";
      }

      let title = "";

      this.activeNavigator.children.forEach((element) => {
        if (this.shouldBeActive(element)) {
          title = element.title;
        }
      });

      return title;
    },
  },
});
</script>

<style lang="postcss" scoped></style>
