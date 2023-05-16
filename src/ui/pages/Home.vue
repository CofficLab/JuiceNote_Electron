<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import  NodeApi  from "../api/NodeApi";
import { useCurrentNodeStore } from "../stores/NodeStore";

const router = useRouter();

let root = useCurrentNodeStore().root
let firstPage = root.getFirstPage();

router.push({ name: "nodes.show", params: { id: firstPage.id } });
</script>
