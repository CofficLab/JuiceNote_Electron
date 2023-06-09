<template>
    <div class="form-control bg-white/20 p-4 rounded-2xl">
        <label class="label">
            <span class="label-text text-accent-content">节点数据库路径</span>
        </label>
        <div class="flex w-full rounded-none flex-row">
            <input type="text" v-model="databasePath" class="text-input text-sm w-full max-w-2xl p-1 rounded-l" />
            <button class="btn btn-sm rounded-r rounded-none px-1" @click="choose">
                <IconEdit class="w-5 h-5"></IconEdit>
            </button>
        </div>
        <label class="label">
            <span class="label-text-alt">数据的存储位置，可以是云盘目录</span>
        </label>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { computed, onMounted } from "vue";
import Preload from "../api/Preload";
import componentLogger from "../log/componentLogger";
import IconEdit from "../icons/IconEdit.vue";

const config = ref({ databasePath: "" });
const databasePath = computed(() => config.value.databasePath);

onMounted(() => {
    Preload.getConfig().then((c) => {
        componentLogger.info("「setting」从主进程获取用户配置", c, typeof c);
        config.value = c
    })
});

const choose = () => {
    Preload.openFolderDialog().then((folders) => {
        if (folders.canceled) return;

        let folder = folders.filePaths[0];
        config.value.databasePath = folder
        Preload.setConfig(JSON.stringify(config.value, null, 2)).then(() => {
            componentLogger.info("「setting」保存用户配置", config.value);
        })
    })
}
</script>