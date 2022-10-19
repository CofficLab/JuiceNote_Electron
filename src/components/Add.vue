<template>
  <button v-on:click="showForm" class="btn my-auto w-full pb-3 rounded-none text-center align-middle">
    <Plus></Plus>
  </button>

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
import Trash from "../icons/trash.vue";
import Plus from "../icons/plus.vue";

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
      let currentNode = store.current(this.$route.path);
      let currentParent = currentNode.getParent();

      if (currentParent !== null) {
        let node = store.createChild(currentParent, this.form.title);
        this.showModal = false;
        this.form.title = "";
        console.log("created", node);
        this.$router.push(node.link);
      } else {
        alert("父节点不存在，无法创建");
      }
    },
  },
  components: { Trash, Plus },
});
</script>
