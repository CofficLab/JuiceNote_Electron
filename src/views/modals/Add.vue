<template>
  <!-- 新建图书节点的弹层 -->
  <div class="modal-open modal" v-show="adding">
    <Transition name="bounce">
      <div class="modal-box" v-if="adding">
        <p class="mb-6">
          为<span class="text-lg font-bold">「{{ parent.title }}」</span>添加子节点
        </p>
        <input
          ref="title"
          type="text"
          v-model="title"
          placeholder="输入标题"
          class="input-bordered input-primary input w-full max-w-xs"
          @keyup.enter="submitPageForm"
        />
        <div class="modal-action">
          <label for="my-modal" class="btn" v-on:click="hide">取消</label>
          <label for="my-modal" class="btn" v-on:click="submitChapterForm">创建章节</label>
          <label for="my-modal" class="btn" v-on:click="submitPageForm">创建页面</label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import ToastController from "../../controllers/ToastController";
export default defineComponent({
  data() {
    return {
      title: "",
    };
  },
  computed: {
    adding: () => NodeController.adding,
    parent: () => NodeController.createChildOf,
  },
  watch: {
    adding: function () {
      if (this.adding) {
        this.$nextTick(function () {
          this.$refs.title.focus();
        });
      }
    },
  },
  methods: {
    hide() {
      NodeController.adding = false;
    },
    submitPageForm() {
      let id = this.parent.createChildPage(this.title);
      if (typeof id == "string") {
        ToastController.set(id);
      } else {
        NodeController.setCurrentPage(id);
        this.hide();
        this.title = "";
      }
    },
    submitChapterForm() {
      let id = this.parent.createChildChapter(this.title);
      if (typeof id == "string") {
        ToastController.set(id);
      } else {
        NodeController.setCurrentPage(id);
        this.hide();
        this.title = "";
      }
    },
  },
});
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
