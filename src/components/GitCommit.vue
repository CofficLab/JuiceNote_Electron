<template>
  <button v-on:click="commit" class="btn my-auto w-full pb-3 rounded-none text-center align-middle">
    <CloudArrowUp></CloudArrowUp>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloudArrowUp from "../icons/cloud-arrow-up.vue";
import store from "../models/store";

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
            store.setToast(stdout);
            setTimeout(() => {
              console.log("清理toast");
              store.setToast("");
            }, 3000);
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
