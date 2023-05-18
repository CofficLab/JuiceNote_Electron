<template>
  <header>
    <Toast></Toast>

    <div class="flex h-full justify-end gap-4" :class="{ 'mr-40': isWindows }">
      <Toolbar :editor="editor" :current="current" v-if="editor && editable"></Toolbar>
      <div class="flex flex-row items-center justify-end gap-2 pr-4">
        <BtnOfficialLink></BtnOfficialLink>
        <Terminal class="operators" v-if="isLesson"></Terminal>
        <Home class="operators"></Home>
        <Database class="operators"></Database>
        <Edit :showText="false" class="operators" v-if="current.isPage"></Edit>
        <Rename :node="current" :show-text="false" class="operators"></Rename>
        <Add :node="current" :show-text="false" class="operators"></Add>
        <Visible :node="current" :show-text="false" class="operators"></Visible>
        <Delete :node="current" :show-text="false" class="operators"></Delete>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Home from "../operators/Home.vue";
import Database from '../operators/Database.vue'
import BtnOfficialLink from "../components/BtnOfficialLink.vue";
import Terminal from "../operators/Terminal.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Preload from "../api/Preload";
import RouteBox from "../entities/RouteBox";
import Edit from "../operators/Edit.vue";
import Add from "../operators/Add.vue";
import Toast from "./Toast.vue";
import Delete from "../operators/Delete.vue";
import Rename from "../operators/Rename.vue";
import Visible from "../operators/Visible.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
import useEditorStore from "../stores/EditorStore";
import Toolbar from "./Toolbar.vue";

const route = useRoute();
const isLesson = computed(() => RouteBox.isLesson(route));
const isWindows = Preload.isWindows();
const current = computed(() => useCurrentNodeStore().current);
const editable = computed(() => route.name == 'nodes.edit')
const editor = computed(() => useEditorStore().editor);
</script>

<style scoped lang="postcss">
.operators {
  @apply btn-ghost btn-sm flex items-center rounded px-2
}
</style>