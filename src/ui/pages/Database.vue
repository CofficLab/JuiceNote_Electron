<template>
    <div class="my-24 flex justify-center">
        <BTree :tree="DatabaseNode" :display="'row'" :hover-callback="handleHover" class="rounded"></BTree>
    </div>
</template>

<script lang="ts" setup>
import { DatabaseNode } from "../entities/Node";
import BTree from "../layouts/BTree.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";
const handleHover = (node) => {
    useCurrentNodeStore().update(node)
}
</script>
