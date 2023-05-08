<template>
    <div class="my-24 flex justify-center">
        <Tree :tree="root" :display="'row'" :hover-callback="handleHover" class="rounded"></Tree>
    </div>
</template>

<script lang="ts" setup>
import { NodeApi } from "../api/NodeApi";
import Tree from "../components/Tree.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
const handleHover = (node) => {
    useCurrentNodeStore().update(node)
}

const root = NodeApi.getRoot()
</script>
