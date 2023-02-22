<template>
  <div>
    <button
      v-on:click="commit"
      class="btn-sm btn btn-ghost my-auto tooltip tooltip-bottom"
      data-tip="提交变动到代码仓库"
    >
      <CloudArrowUp></CloudArrowUp>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloudArrowUp from "../icons/cloud-arrow-up.vue";
import ToastController from "../controllers/ToastController";

export default defineComponent({
  components: {
    CloudArrowUp,
  },
  methods: {
    commit: function () {
      let exec = require("child_process").exec;
      exec("git add -A", function (error: any, stdout: any, stderr: any) {
        if (stdout) console.log(stdout);
        if (error) return console.error(stderr, error);

        exec("git commit -m '提交文档变动'", function (error: any, stdout: string, stderr: any) {
          if (stdout) {
            console.log(stdout);
            ToastController.set(stdout);
          }
          if (error) return console.error(stderr, error);

          exec("git push", function (error: any, stdout: any, stderr: any) {
            if (stdout) console.log(stdout);
            if (error) console.error(stderr);
          });
        });
      });
    },
  },
});
</script>
