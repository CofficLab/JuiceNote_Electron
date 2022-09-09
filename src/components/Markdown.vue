<template>
	<div class="fixed w-full">
		<div class="w-full bg-red-800 rounded-none shadow-3xl bg-opacity-70 h-12 z-50">
			<div class="h-full flex justify-start container mx-auto prose">
				<h1 class="align-middle my-0 py-auto place-self-center text-3xl" v-on:dblclick="showEditor">标题</h1>
			</div>
		</div>
	</div>
	<div class="prose mx-auto min-h-screen pb-96 container" v-html="html"></div>
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