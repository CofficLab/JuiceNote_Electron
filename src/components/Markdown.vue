<template>
	<div class="flex flex-row">
		<div class="prose mx-auto min-h-screen pb-96 container" v-html="html"></div>
		<div v-html="toc" class="w-56 bg-cyan-400 prose"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import markdown from '../models/markdown'
import '../app.css'

export default defineComponent({
	props: ['path'],
	methods: {
		getContentsWithToc(): string {
			return markdown.getMarkdownRenderedContent(this.path)
		},
		showEditor(): void {
			this.$router.push('/editor/' + this.path)
		}
	},
	computed: {
		getEditorLink(): string {
			return '/editor/' + this.path
		},
		toc(): string {
			return markdown.getMarkdownToc(this.path)
		},
		html(): string {
			return markdown.getMarkdownRenderedContentWithoutToc(this.path)
		}
	}
})

</script>