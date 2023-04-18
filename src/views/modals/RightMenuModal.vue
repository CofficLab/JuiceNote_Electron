<template>
  <RightMenu :event="event">
    <li><ShowCurrent :node="node"></ShowCurrent></li>
    <li><Rename :node="node"></Rename></li>
    <li><Edit :bookNode="node"></Edit></li>
    <li><ToTab :node="node"></ToTab></li>
    <li><Delete :bookNode="node"></Delete></li>
    <li><CreateChild :node="node"></CreateChild></li>
    <li><Visible :node="node"></Visible></li>
    <li><ShowCurrent :node="node.getBook()"></ShowCurrent></li>
    <li><CreateChild :node="node.getBook()"></CreateChild></li>
  </RightMenu>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import Rename from "../operators/Rename.vue";
import Edit from "../operators/Edit.vue";
import Delete from "../operators/Delete.vue";
import ToTab from "../operators/ToTab.vue";
import RightMenu from "../components/RightMenu.vue";
import { Node } from "../../models/Node";
import CreateChild from "../operators/Add.vue";
import Visible from "../operators/Visible.vue";
import ShowCurrent from "../operators/ShowCurrent.vue";
import { useRoute } from "vue-router";

const props = defineProps({
  event:null
})

const route = useRoute();

const node = computed(() => {
  return Node.find(parseInt(route.params.id.toString()));
});

</script>

<style scoped lang="postcss">
li {
  @apply list-none text-base
}
</style>