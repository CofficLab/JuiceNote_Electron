<template>
  <div class="card relative h-36 w-72 bg-base-100 shadow-2xl">
    <div class="badge-warning badge absolute left-0 top-2 gap-2 shadow-2xl" v-if="!book.isVisible">已隐藏</div>
    <div class="dropdown-left dropdown absolute bottom-0 right-0" v-if="editable">
      <label tabindex="0" class="btn-sm btn m-1 ring">...</label>
      <ul tabindex="0" class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow">
        <li><ChangeCover @click="openUploadDialog" :node="book"></ChangeCover></li>
        <li><Visible :showText="true" :node="book"></Visible></li>
      </ul>
    </div>
    <router-link :to="'/lessons/' + book.id + '/show'">
      <figure class="max-h-56 rounded-xl">
        <img v-if="!book.cover" src="/images/book.png" />
        <img v-else :src="book.cover" class="h-36 w-72" />
      </figure>
    </router-link>

    <!-- 封面的裁剪框 -->
    <div class="modal modal-open" v-if="isCropperVisible">
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
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import ToastController from "../controllers/ToastController";
import Visible from "../operators/Visible.vue";
import { Node } from "../../models/Node";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import ChangeCover from "../operators/ChangeCover.vue";

const route = useRoute();
let props = defineProps({
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

watch(props, function () {
  book.value = props.book;
});
</script>
