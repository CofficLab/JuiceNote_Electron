<template></template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Node } from "../entities/Node";

const router = useRouter();

let firstBook = Node.getBooks()[0];
let firstPage = firstBook.getFirstPage();

router.push({ name: "lessons.show", params: { id: firstPage.id } });
</script>
