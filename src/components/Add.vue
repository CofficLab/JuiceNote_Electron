<template>
  <button v-on:click="show" class="btn btn-sm my-auto rounded-none">
    <Plus></Plus>
  </button>

  <!-- 增加章节的弹层 -->
  <div class="modal z-50" v-bind:class="showModal ? 'modal-open' : ''">
    <div class="modal-box">
      <input
        ref="title"
        type="text"
        autofocus
        v-model="title"
        placeholder="输入标题"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <div class="modal-action">
        <label for="my-modal" class="btn" v-on:click="hide">取消</label>
        <label for="my-modal" class="btn" v-on:click="submit">提交</label>
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
      showModal: false,
      title: "",
    };
  },
  methods: {
    show() {
      this.showModal = true;
      this.$nextTick(function () {
        (this.$refs.title as any).focus();
      });
    },
    hide() {
      this.showModal = false;
    },
    submit() {
      let current = store.current;
      let parent = current.parent();

      if (parent.isEmpty()) return console.error("父节点不存在，无法创建");

      store.goto(store.createChild(parent, this.title).id);
      this.showModal = false;
      this.title = "";
    },
  },
  components: { Plus },
});
</script>
