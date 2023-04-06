<template>
  <div class="card h-56 w-56 bg-base-100 shadow-2xl">
    <div class="card-body">
      <h2 class="card-title text-yellow-700">{{ book.title }}</h2>
      <div class="dropdown-left dropdown absolute top-1 right-0" v-if="editable">
        <label tabindex="0" class="btn-ghost btn m-1">...</label>
        <ul tabindex="0" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
          <li><a href="javascript:void(0)" @click="openUploadDialog">更换封面</a></li>
        </ul>
      </div>
    </div>
    <router-link :to="'/lessons/' + book.id + '/show'">
      <figure class="max-h-40 rounded-b-xl">
        <img v-if="!book.cover" src="/images/book.png" />
        <img v-else :src="book.cover" class="h-28 w-56" />
      </figure>
    </router-link>

    <!-- 封面的裁剪框 -->
    <div class="modal-open modal" v-if="isCropperVisible">
      <div class="modal-box flex flex-col items-center">
        <div class="h-96 w-screen">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :fixedNumber="[2, 1]"
            :fixed="true"
            :maxImgSize="500"
            :limitMinSize="20"
            :autoCrop="true"
            :info="true"
            :centerBox="true"
            :outputSize="option.size"
            :outputType="option.outputType"
          ></VueCropper>
        </div>
        <div class="modal-action">
          <button @click="submit" class="btn">Yay!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { readFile } from "fs";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ToastController from "../../controllers/ToastController";
import { Node } from "../../models/Node";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";

const route = useRoute();
const props = defineProps({
  book: Node,
});

let isCropperVisible = ref(false);
let cropper = ref(null);
let option = ref({
  img: "",
  size: 1,
  outputType: "png",
});

let book = ref(props.book);
let editable = computed(() => {
  return route.name == "home.edit";
});

const openUploadDialog = () => {
  // 创建一个<input>元素
  var input = document.createElement("input");
  input.type = "file";

  // 添加change事件监听器，用于处理选择文件后的操作
  input.addEventListener("change", function (event) {
    var file = event.target.files[0]; // 获取选中的文件
    readFile(file.path, (err, data) => {
      option.value.img = "data:image/png;base64," + data.toString("base64");
      isCropperVisible.value = true;
    });
  });

  // 模拟点击<input>元素，触发文件选择对话框
  input.click();
};

const submit = function () {
  cropper.value.getCropData((data) => {
    ToastController.set(book.value.updateCover(data));
    book.value = book.value.refresh();
    isCropperVisible.value = false;
  });
};
</script>
