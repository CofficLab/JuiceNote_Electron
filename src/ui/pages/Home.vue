<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useCurrentNodeStore } from "../stores/NodeStore";

const router = useRouter();
let root = useCurrentNodeStore().root

router.push({ name: "nodes.show", params: { id: root.id } });
</script>
