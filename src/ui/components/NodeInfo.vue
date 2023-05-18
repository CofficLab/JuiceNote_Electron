<template>
    <div>
        <div class="stats shadow bg-primary/25 drop-shadow-2xl">
            <img :src="node.cover" alt="封面" v-if="node.cover?.length > 0" class="w-48 shadow-none">

                <div class="stat place-items-center">
                    <div class="stat-value">{{ node.title }}</div>
                </div>

            <div class="stat place-items-center">
                <div class="stat-title">ID</div>
                <div class="stat-value">{{ node.id }}</div>
            </div>

            <!-- <div class="stat flex-wrap place-items-center">
                <div class="stat-title">Slug</div>
                <div class="stat-value">{{ node.slug }}</div>
            </div> -->

            <div class="stat place-items-center">
                <div class="stat-title">可见性</div>
                <div class="stat-value">{{ node.isVisible ? '正常' : '隐藏' }}</div>
            </div>

            <div class="stat place-items-center">
                <div class="stat-title">排序</div>
                <div class="stat-value">{{ node.priority }}</div>
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