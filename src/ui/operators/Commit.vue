<template>
  <div @click="commit">
    <CloudArrowUp v-if="showIcon"></CloudArrowUp>
    <span v-if="showText">提交变动到代码仓库</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloudArrowUp from "../icons/IconUp.vue";
import { useToastStore } from "../stores/ToastStore";

export default defineComponent({
  props: {
    showText: {
      type: Boolean,
      default: true,
      required: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  components: { CloudArrowUp },
  methods: {
    commit: function () {
      let exec = require("child_process").exec;
      exec("git add -A", function (error: any, stdout: any, stderr: any) {
        if (stdout) console.log(stdout);
        if (error) return console.error(stderr, error);

        exec("git commit -m '提交文档变动'", function (error: any, stdout: string, stderr: any) {
          if (stdout) {
            console.log(stdout);
            useToastStore().set(stdout);
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
