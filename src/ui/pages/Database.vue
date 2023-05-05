<template>
    <div class="my-24 flex justify-center">
        <BTree :current="root" class="w-56 bg-primary/10 rounded"></BTree>
    </div>
</template>

<script lang="ts" setup>
import { RootNode } from "../entities/Node";
import BTree from "../layouts/BTree.vue";

const root = RootNode

</script>
