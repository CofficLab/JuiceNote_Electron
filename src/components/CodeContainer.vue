<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :extensions="extensions"
    :tab-size="4"
    @ready="handleReady"
    @change="log('change', $event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
</template>

<script>
import { defineComponent, ref, shallowRef } from "vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark";
import store from "../models/store";

export default defineComponent({
  components: {
    Codemirror,
  },
  data() {
    return {
      extensions: [javascript(), json(), python(), sql(), java(), cpp(), php(), oneDark],
    };
  },
  computed: {
    code: function () {
      return store.code;
    },
  },
  methods: {
    handleReady: (payload) => {
      const view = shallowRef();
      view.value = payload.view;
    },
    log: console.log,
  },
});
</script>
