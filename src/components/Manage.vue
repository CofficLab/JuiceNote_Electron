<template>
  <div class="dropdown dropdown-top z-50 w-full">
    <label tabindex="0" class="btn my-auto w-full pb-3 rounded-none text-center align-middle">
      <Cog></Cog>
    </label>
    <ul tabindex="0" class="dropdown-content shadow-3xl">
      <div class="btn w-48 rounded-none" v-on:click="toggleEditMode" v-html="editHTML"></div>
      <label class="btn w-48 rounded-none modal-button" for="my-modal-4">排序</label>
      <div class="btn w-48 rounded-none" v-on:click="deleteNav">删除</div>
      <div class="btn w-48 rounded-none" v-on:click="showForm">增加章节</div>
    </ul>
  </div>

  <!-- 增加章节的弹层 -->
  <div class="modal z-50" v-bind:class="showModal ? 'modal-open' : ''">
    <div class="modal-box">
      <input
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

  <!-- 排序的弹层 -->
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative overflow-scroll h-3/4" for="">
      <Sort></Sort>
    </label>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import { nav } from "../models/nav";
import path from "path";
import Cog from "../icons/cog.vue";
import Sort from "./Sort.vue";

export default defineComponent({
  data() {
    return {
      showModal: false,
      showSortModal: false,
      form: {
        title: "",
      },
    };
  },
  methods: {
    showForm() {
      this.showModal = true;
      this.$nextTick(function () {
        this.$refs.title.focus();
      });
    },
    showSortForm() {
      this.showSortModal = true;
    },
    hideForm() {
      this.showModal = false;
    },
    hideSortForm() {
      this.showSortForm = false;
    },
    submit() {
      store.makeNavigator(path.join(nav.getBookName(this.$route.path), this.form.title));
      this.showModal = false;
      console.log(this.$route.path);
      this.$router.push(this.$route.path);
    },
    toggleEditMode: function () {
      console.log("toggle edit mode");
      if (store.edit_mode) {
        store.leaveEditMode();
        this.$router.push(this.$route.path.replace("editor", "article"));
      } else {
        store.enterEditMode();
        this.$router.push(this.$route.path.replace("article", "editor"));
      }
    },
    deleteNav: function () {
      console.log("delete button clicked");
      console.log(this.$route.path);
      console.log(nav.getBookName(this.$route.path));
      this.$router.push("/article/" + nav.getBookName(this.$route.path) + "@home");
      console.log(this.$route.path);
      nav.deleteNav(this.$route.path);
    },
  },
  computed: {
    path: function () {
      return this.$route.path.replace("/article", "");
    },
    editHTML(): string {
      return store.edit_mode ? "返回" : "编辑";
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
  },
  components: { Cog, Sort },
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
