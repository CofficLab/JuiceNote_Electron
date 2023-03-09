<template>
  <!-- 重命名的弹层 -->
  <div class="modal-open modal" v-show="display">
    <Transition name="bounce">
      <div class="modal-box" v-if="display">
        <input
          ref="title"
          type="text"
          v-model="title"
          placeholder="输入新的标题"
          autofocus
          class="input-bordered input-primary input w-full max-w-xs bg-yellow-300/10"
          @keyup.enter="submit"
        />
        <div class="modal-action">
          <label for="my-modal" class="btn" v-on:click="hide">取消</label>
          <label for="my-modal" class="btn" v-on:click="submit">确定</label>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeController from "../../controllers/NodeController";
import ToastController from "../../controllers/ToastController";
import { emptyNode } from "../../models/Node";
export default defineComponent({
  data() {
    return {
      title: "",
    };
  },
  computed: {
    node: () => NodeController.getRenamingNode(),
    display: () => !NodeController.getRenamingNode().isEmpty,
  },
  mounted: function () {
    this.title = this.node.title;
  },
  watch: {
    node() {
      console.log("正在重命名的节点发生了变化，现在是", this.node.id, this.node.title);
      this.title = this.node.title;
    },
    display() {
      console.log("正在重命名的节点的display发生了变化");
      this.$nextTick(function () {
        if (this.$refs.title != null) this.$refs.title.focus();
      });
    },
  },
  methods: {
    hide() {
      NodeController.setRenamingNode(emptyNode);
    },
    submit() {
      ToastController.set(NodeController.updateTitle(this.node, this.title));
      this.hide();
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
