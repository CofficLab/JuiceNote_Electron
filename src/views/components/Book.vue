<template>
  <div class="card w-56 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-yellow-700">{{ book.title }}</h2>
      <div class="dropdown-left dropdown absolute top-1 right-0">
        <label tabindex="0" class="btn-ghost btn m-1">...</label>
        <ul tabindex="0" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
          <li><a href="javascript:void(0)" @click="openUploadDialog">更换封面</a></li>
        </ul>
      </div>
    </div>
    <router-link :to="'/lessons/' + book.id + '/show'">
      <figure class="max-h-40 rounded-b-xl">
        <img v-if="!book.cover" src="/images/book.png" />
        <img v-else :src="'data:image/png;base64,' + book.cover" class="h-40 w-auto" />
      </figure>
    </router-link>
  </div>
</template>

<script setup>
import { readFile } from "fs";
import { ref } from "vue";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";

const props = defineProps({
  book: Node,
});

let book = ref(props.book);

const openUploadDialog = () => {
  // 创建一个<input>元素
  var input = document.createElement("input");
  input.type = "file";

  // 添加change事件监听器，用于处理选择文件后的操作
  input.addEventListener("change", function (event) {
    var file = event.target.files[0]; // 获取选中的文件
    readFile(file.path, (err, data) => {
      ToastController.set(book.value.updateCover(data.toString("base64")));
      book.value = book.value.refresh();
    });
  });

  // 模拟点击<input>元素，触发文件选择对话框
  input.click();
};
</script>
