<template>
    <div class="my-24">
        <BTree :current="root"></BTree>
    </div>
</template>

<script lang="ts" setup>
import { RootNode } from "../entities/Node";
import BTree from "../layouts/BTree.vue";

const root = RootNode

</script>
