<template>
    <div>
        <div class="flex flex-col gap-4">
            <div class="stats shadow bg-primary/60 drop-shadow-2xl backdrop-blur backdrop-filter">
                <img :src="node.cover" alt="封面" v-if="node.cover?.length > 0" class="w-48 shadow-none">

                <div class="stat place-items-center hover:bg-primary-focus">
                    <div class="stat-value" v-if="node.isEmpty">内容为空</div>
                    <div class="stat-value" :class="{ 'text-secondary': !node.isVisible }" v-else>{{ node.title }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Node } from '../entities/Node'
defineProps({
    node: {
        type: Node,
        required: true
    }
})
</script>