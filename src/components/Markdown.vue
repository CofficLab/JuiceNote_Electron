<template>
	<div class="w-full flex flex-row justify-start gap-24 px-0">
		<div class="w-48 prose card bg-base-100 rounded-none shadow-3xl fixed bg-opacity-70">
			<div v-html="toc" class="w-full min-h-screen flex justify-center"></div>
		</div>

		<div class="ml-48 w-full">
			<div v-on:dblclick="showEditor" class="h-12"></div>
			<div class="prose min-w-max mx-auto min-h-screen pb-96 container" v-html="html"></div>
		</div>
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