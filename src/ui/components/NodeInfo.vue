<template>
    <div>
        <div class="flex flex-col gap-4">
            <div class="stats shadow bg-primary/60 drop-shadow-2xl backdrop-blur backdrop-filter">
                <img :src="node.cover" alt="封面" v-if="node.cover?.length > 0" class="w-48 shadow-none">

                <div class="stat place-items-center hover:bg-primary-focus">
                    <div class="stat-value" v-if="node.isEmpty">内容为空</div>
                    <div class="stat-value" v-else>{{ node.title }}</div>
                </div>
            </div>

            <div class="stats shadow bg-secondary/20 drop-shadow-xl py-0  backdrop-blur backdrop-filter" v-if="!node.isEmpty">
                <div class="stat place-items-center hover:bg-primary-focus">
                    <div class="stat-title text-sm">ID</div>
                    <div class="stat-value text-base">{{ node.id }}</div>
                </div>

                <div class="stat place-items-center hover:bg-primary-focus">
                    <div class="stat-title text-sm">可见性</div>
                    <div class="stat-value text-base">{{ node.isVisible ? '显示' : '隐藏' }}</div>
                </div>

                <div class="stat place-items-center hover:bg-primary-focus">
                    <div class="stat-title text-sm">排序</div>
                    <div class="stat-value text-base">{{ node.priority ?? '0' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Node } from '../entities/Node'
import IconInfo from '../icons/IconInfo.vue';
const props = defineProps({
    node: {
        type: Node,
        required: true
    }
})
</script>