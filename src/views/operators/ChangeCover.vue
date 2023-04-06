<template>
    <label @click="changeCurrentNode">更换封面</label>
</template>

<script setup>
import store from "../store"

const props = defineProps({
    node: Object,
});

const changeCurrentNode = () => {
    store.currentNode = props.node
    store.changeCoverFormDisplay = true
}

</script>
