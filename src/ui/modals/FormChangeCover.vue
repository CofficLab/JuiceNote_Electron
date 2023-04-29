<template>
  <div class="modal" :class="{ 'modal-open': changeCoverFormDisplay }">
    <div class="modal-box relative">
      <label for="change-cover" class="btn-sm btn-circle btn absolute right-2 top-2" @click="close">✕</label>
      <h3 class="mb-8 text-lg font-bold" v-html="'为「' + node?.title + '」设置封面图'"></h3>
      <form @submit.prevent="submit">
        <input type="file" class="input" @input="onFileInput" />
        <progress v-if="form.progress" :value="form.progress.percentage" max="100">{{ form.progress.percentage }}%</progress>
        <button type="submit">保存</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
let node = computed(() => Node.find(route.params.id));
const changeCoverFormDisplay = false;

const form = ref({
  cover: null,
});

let submit = () => {
  router.post(route("blogs.update", { blog: node.value.id }), {
    _method: "put",
    cover: form.cover,
  });

  store.changeCoverFormDisplay = false;
};

const onFileInput = (event) => {
  form.cover = event.target.files[0];
};

const close = () => {
  store.changeCoverFormDisplay = false;
};
</script>
