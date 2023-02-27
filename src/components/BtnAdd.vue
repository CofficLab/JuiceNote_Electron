<template>
  <div>
    <button class="btn-ghost tooltip tooltip-left btn-sm btn" data-tip="添加章节或页面" @click="showForm">
      <Plus></Plus>
    </button>

    <!-- 弹层 -->
    <div class="modal modal-open" v-bind:class="formSwitcher ? '' : 'hidden'">
      <div class="modal-box">
        <input
          ref="title"
          type="text"
          v-model="title"
          autofocus
          placeholder="输入标题"
          class="input-bordered input-primary input w-full max-w-xs"
          @keyup.enter="submitPageForm"
        />
        <div class="modal-action">
          <label for="my-modal" class="btn" v-on:click="hideForm">取消</label>
          <label for="my-modal" class="btn" v-on:click="submitChapterForm">创建章节</label>
          <label for="my-modal" class="btn" v-on:click="submitPageForm">创建页面</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../controllers/RouteController";
import Plus from "../icons/plus.vue";

export default defineComponent({
  data() {
    return {
      formSwitcher: false,
      title: "",
    };
  },
  methods: {
    showForm() {
      this.$refs.title.focus();
      this.formSwitcher = true;
      this.$refs.title.focus();
      this.$nextTick(function () {
        this.$refs.title.focus();
      });
    },
    hideForm() {
      this.formSwitcher = false;
    },
    submitPageForm() {
      let current = RouteController.getCurrentPage();
      let parent = current.isLeaf() ? current.parent() : current;

      if (parent.isEmpty()) return console.error("父节点不存在，无法创建");

      RouteController.goto(store.createChild(parent, this.title).id);
      this.formSwitcher = false;
      this.title = "";
    },
    submitChapterForm() {
      let current = RouteController.getCurrentPage();
      let parent = current.parent();

      if (parent.isEmpty()) return console.error("父节点不存在，无法创建");

      RouteController.goto(store.createFolderChild(parent, this.title).id);
      this.formSwitcher = false;
      this.title = "";
    },
  },
  components: { Plus },
});
</script>
