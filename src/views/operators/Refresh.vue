<template>
  <div @click="refresh">刷新</div>
</template>

<script>
import RouteController from "../../controllers/RouteController";
import RightMenuController from "../../controllers/RightMenuController";
import ToastController from "../../controllers/ToastController";

export default {
  methods: {
    refresh() {
      RouteController.refresh();
      RightMenuController.hide();
      ToastController.set("已刷新");
    },
  },
};
</script>
