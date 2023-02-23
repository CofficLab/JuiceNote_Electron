<template>
  <div>
    <div
      v-if="editMode"
      v-on:click="save"
      class="btn-sm btn btn-ghost my-auto tooltip-bottom tooltip flex items-center"
      data-tip="保存页面"
    >
      <InboxArrowDown></InboxArrowDown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PencilSquare from "../icons/pencil-square.vue";
import InboxArrowDown from "../icons/inbox-arrow-down.vue";
import RouteController from "../controllers/RouteController";
import ToastController from "../controllers/ToastController";

export default defineComponent({
  components: {
    PencilSquare,
    InboxArrowDown,
  },
  methods: {
    save() {
      let current = RouteController.getCurrentPage();
      let markdownSourceCode = document.getElementById("editor-content")?.value;
      if (markdownSourceCode != undefined) {
        console.log("要保存的内容\n", markdownSourceCode);
        if (markdownSourceCode == current.markdownSourceCode()) {
          console.log("没有变化，无需保存");
        } else {
          current.save(markdownSourceCode);
          console.log("已保存");
        }
      } else {
        ToastController.set("不能保存，因为保存按钮找不到编辑器的内容");
      }
    },
  },
  computed: {
    editMode() {
      return RouteController.isEditMode();
    },
  },
});
</script>
