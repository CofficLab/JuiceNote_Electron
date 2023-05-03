<template>
  <VueDragResize
    :isActive="false"
    :minw="300"
    :minh="100"
    :w="800"
    :h="300"
    :x="200"
    :y="50"
    :sticks="['br']"
    :stickSize="12"
    :preventActiveBehavior="false"
    :parentLimitation="false"
    v-on:resizing="resize"
    v-on:dragging="resize"
    contentClass="terminal"
  >
    <div class="h-full w-full rounded-2xl bg-black p-4">
      <div :id="'terminal' + id" class="flex h-full w-full justify-center"></div>
    </div>
  </VueDragResize>
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import xtermTheme from "xterm-theme";
import DraggableWindow from "../components/DraggableWindow.vue";
import VueDragResize from "vue-drag-resize/src";
import Preload from "../api/Preload";

const ipc = Preload.ipc;

export default {
  props: {
    id: {
      type: Number,
    },
    showFlag: {
      type: Boolean,
    },
  },
  watch: {
    showFlag: {
      handler: function (newVal, oldVal) {
        this.fitSize();
      },
      immediate: true,
    },
  },
  name: "Term",
  data() {
    return {
      xterm: null,
      fitAddon: null,
      channels: null,
      width: 0,
      height: 0,
    };
  },
  beforeDestroy() {
    this.destroyTerm();
  },
  mounted() {
    this.initConnect();
    this.fitSize();
  },
  methods: {
    initConnect() {
      this.destroyTerm();
      let that = this;
      Preload.ipc.invoke("terminal-create").then((res) => {
        let pid = res;
        let xterm = new Terminal({
          allowTransparency: true,
          fontSize: 20,
          fontFamily: "Monaco",
          fontWeight: 22,
          cursorBlink: true,
          //  'block' | 'underline' | 'bar'
          cursorStyle: "bar",
          theme: xtermTheme.Atom,
        });
        let fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);
        xterm.open(document.getElementById("terminal" + this.id));
        that.xterm = xterm;
        that.fitAddon = fitAddon;
        that.channels = ["terminal-incomingData-" + pid, "terminal-keystroke-" + pid, "terminal-resize-" + pid, "terminal-close-" + pid];
        xterm.onData((data) => ipc.send(that.channels[1], data));
        xterm.onResize((size) => ipc.send(that.channels[2], size.cols, size.rows));
        window.preloadApi.terminal.incomingData(pid, (event, data) => xterm.write(data));
        window.onresize = () => that.fitSize();
        that.fitSize();
        xterm.focus();
      });
    },
    destroyTerm() {
      if (this.xterm) {
        this.xterm.dispose();
        this.xterm = null;
      }
      if (this.fitAddon) {
        this.fitAddon.dispose();
        this.fitAddon = null;
      }
      if (this.channels) {
        ipc.send(this.channels[3]);
        ipc.removeAllListeners(this.channels[0]);
        this.channels = null;
      }
    },
    fitSize() {
      if (this.fitAddon) {
        // console.log("fit size");
        this.fitAddon.fit();
      }
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
      //   console.log("resize");
      //   console.log("new width", newRect.width);
      //   console.log("new height", newRect.height);
      this.fitSize();
    },
  },
  components: { DraggableWindow, VueDragResize },
};
</script>

<style scoped lang="postcss">
.terminal {
  @apply rounded-2xl bg-red-400 p-0 shadow-2xl shadow-black ring;
}
</style>
