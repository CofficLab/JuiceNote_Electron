<template>
    <div class="my-24 flex justify-center">
        <Tree :tree="DatabaseNode" :display="'row'" :hover-callback="handleHover" class="rounded"></Tree>
    </div>
</template>

<script lang="ts" setup>
import { DatabaseNode } from "../entities/Node";
import Tree from "../components/Tree.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
const handleHover = (node) => {
    useCurrentNodeStore().update(node)
}
</script>
