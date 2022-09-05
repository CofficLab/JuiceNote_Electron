<template>
	<div class="w-full flex flex-row justify-start gap-24 px-0">
		<div class="w-48 prose card bg-base-100 rounded-none shadow-3xl">
			<div v-html="toc" class="w-full min-h-screen flex justify-center"></div>
		</div>
		<div class="prose min-w-max mx-auto min-h-screen pb-96" v-html="html"></div>
	</div>
</template>

<script lang="ts">
import fs from 'fs'
import path from 'path'
var md = require('markdown-it')({
	html: true
});

md.use(require("markdown-it-anchor").default); // Optional, but makes sense as you really want to link to something, see info about recommended plugins below
md.use(require("markdown-it-table-of-contents"));

export default {
	props: ['path'],
	methods: {
		getContentsWithToc(): string {
			var cwd = process.cwd()
			var routePath = this.path.replace('@', '/')

			// console.log('markdown component:' + 'current route path is ' + routePath)
			var markdownFile = path.join(cwd, 'src/markdown/', routePath + '.md')

			if (!fs.existsSync(markdownFile)) {
				fs.writeFileSync(markdownFile, "# " + markdownFile.replace(cwd, ''))
			}

			// console.log('try to find markdown file at ' + markdownFile)

			var markdownContent = fs.readFileSync(markdownFile, 'utf-8')
			var html = md.render("[[toc]] \r\n" + markdownContent)

			return html
		}
	},
	computed: {
		toc(): string {
			var dom = document.createElement('div')
			var htmlWithToc = this.getContentsWithToc()
			dom.innerHTML = htmlWithToc

			var toc = dom.getElementsByClassName('table-of-contents')

			return toc[0].outerHTML
		},
		html(): string {
			var html = this.getContentsWithToc()
			var dom = document.createElement('div')
			dom.innerHTML = html
			dom.removeChild(dom.getElementsByClassName('table-of-contents')[0])

			return dom.innerHTML
		}
	}
}

</script>