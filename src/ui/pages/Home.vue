<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { NodeApi } from "../api/NodeApi";

const router = useRouter();

let root = NodeApi.getRoot();
let firstPage = root.getFirstPage();

router.push({ name: "nodes.show", params: { id: firstPage.id } });
</script>
