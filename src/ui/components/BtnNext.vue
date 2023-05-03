<template>
  <div
    v-bind:id="next?.id"
    v-bind:class="!next ? 'btn-disabled' : ''"
    class="btn-ghost tooltip tooltip-bottom btn-sm btn flex w-12 items-center"
    data-tip="下一页"
  >
    <Next :current="current" :showText="false"></Next>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Next from "../operators/Next.vue";

const props = defineProps({
  current: { type: Node, required: true },
})

const next = computed(() => props.current.nextPage())
</script>
