<template>
    <div class="my-24 flex justify-center">
        <BTree :current="root" :display="'row'" class=" rounded"></BTree>
    </div>
</template>

<script lang="ts" setup>
import { RootNode } from "../entities/Node";
import BTree from "../layouts/BTree.vue";

const root = RootNode

</script>
