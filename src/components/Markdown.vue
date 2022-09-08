<template>
	<div class="w-full flex flex-row justify-start gap-0 px-0">
		<div class="mr-0 w-full">
			<div class="w-full bg-red-800 rounded-none shadow-3xl bg-opacity-70 h-12 p-0 sticky top-8 z-50">
				<div class="h-full w-full flex justify-center">
					<h1 class="align-middle my-0 py-auto place-self-center text-3xl" v-on:dblclick="showEditor">标题</h1>
				</div>
			</div>
			<div class="prose min-w-max mx-auto min-h-screen pb-96 container" v-html="html"></div>
		</div>

		<div class="w-48 prose card bg-base-100 rounded-none shadow-3xl bg-opacity-70">
			<div class="dropdown w-56 fixed z-50">
				<label tabindex="0" class="btn m-0 w-full rounded-none">
					<span>xxxxx</span>
					<svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
						viewBox="0 0 24 24">
						<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
					</svg>
				</label>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow-2xl bg-blue-200 w-full z-50">
					<li><a href="">1</a></li>
					<li><a href="">2</a></li>
				</ul>
			</div>
			<div v-html="toc" class="w-full min-h-screen flex justify-center mt-12"></div>
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