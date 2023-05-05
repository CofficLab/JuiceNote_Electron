<template>
    <div class="my-24 flex justify-center">
        <BTree :current="root" :display="'row'" :hover-callback="handleHover" class=" rounded"></BTree>
    </div>
</template>

<script lang="ts" setup>
import { RootNode } from "../entities/Node";
import BTree from "../layouts/BTree.vue";
import { useCurrentNodeStore } from "../stores/NodeStore";

const root = RootNode

const handleHover = (node) => {
    console.log('handele')
    useCurrentNodeStore().update(node)
}

</script>
