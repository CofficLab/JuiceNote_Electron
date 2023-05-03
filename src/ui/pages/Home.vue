<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { NodeApi } from "../entities/Node";

const router = useRouter();

let firstBook = NodeApi.getFirstBook();
let firstPage = firstBook.getFirstPage();

router.push({ name: "lessons.show", params: { id: firstPage.id } });
</script>
