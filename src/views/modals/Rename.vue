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
          class="input-bordered input-primary input w-full max-w-xs bg-yellow-300"
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
import RouteController from "../../controllers/RouteController";
import ToastController from "../../controllers/ToastController";
import BookNode from "../../entities/BookNode";
export default defineComponent({
  data() {
    return {
      title: "",
    };
  },
  computed: {
    bookNode: () => RouteController.renamingBookNode,
    display: () => !RouteController.renamingBookNode.isEmpty(),
  },
  mounted: function () {
    this.title = this.bookNode.name;
  },
  watch: {
    bookNode() {
      this.title = this.bookNode.name;
    },
  },
  methods: {
    hide() {
      RouteController.renamingBookNode = new BookNode();
    },
    submit() {
      let newNode = this.bookNode.rename(this.title);
      RouteController.goto(newNode.id);
      ToastController.set("已重命名");
      RouteController.renamingBookNode = new BookNode();
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
