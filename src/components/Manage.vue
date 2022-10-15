<template>
  <div class="dropdown dropdown-end z-50 w-full">
    <label tabindex="0" class="btn m-0 w-full rounded-none">
      <Cog></Cog>
    </label>
    <ul tabindex="0" class="dropdown-content shadow-3xl">
      <div class="btn w-48 rounded-none" v-on:click="toggleEditMode" v-html="editHTML" :disabled="editDisabled"></div>
      <div class="btn w-48 rounded-none" v-on:click="toggleSortMode" v-html="sortHTML"></div>
      <div class="btn w-48 rounded-none" v-on:click="deleteNav" v-html="deleteHTML"></div>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../models/store";
import { nav } from "../models/nav";
import path from "path";
import Cog from "../icons/cog.vue";

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
    toggleSortMode: function () {
      // console.log("toggle sort mode");
      if (store.sort_mode) {
        store.leaveSortMode();
        this.$router.push("/");
      } else {
        store.enterSortMode();
        this.$router.push("/sort");
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
    editDisabled: function () {
      return store.sort_mode ? true : null;
    },
    path: function () {
      return this.$route.path.replace("/article", "");
    },
    editHTML(): string {
      return store.edit_mode ? "返回" : "编辑";
    },
    sortHTML(): string {
      return store.sort_mode ? "返回" : "排序";
    },
    deleteHTML(): string {
      return "删除";
    },
    inEditMode(): boolean {
      return store.edit_mode;
    },
  },
  components: { Cog },
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
