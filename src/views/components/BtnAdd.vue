<template>
  <div>
    <button
      class="btn-ghost tooltip tooltip-left btn-sm btn flex items-center"
      data-tip="添加章节或页面"
      @click="showForm"
    >
      <Plus></Plus>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteController from "../../controllers/RouteController";
import Plus from "../../assets/icons/plus.svg";

export default defineComponent({
  data() {
    return {
      formSwitcher: false,
      title: "",
    };
  },
  methods: {
    showForm() {
      RouteController.adding = true;
    },
  },
  components: { Plus },
});
</script>
