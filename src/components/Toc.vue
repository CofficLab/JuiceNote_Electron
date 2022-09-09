<template>
    <div v-html="toc" class="w-full min-h-screen prose"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import markdown from '../models/markdown';

export default defineComponent({
    props: ['path'],
    computed: {
        toc(): string {
            return markdown.getMarkdownToc(this.path)
        }
    }
})
</script>