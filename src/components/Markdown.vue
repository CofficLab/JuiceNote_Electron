<template>
	<div class="prose">
		<div v-html="html"></div>
	</div>
</template>

<script lang="ts">
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export default {
	props: ['path'],
	computed: {
		html(): string {
			var cwd = process.cwd()
			var routePath = this.path.replace('@', '/')

			// console.log('markdown component:' + 'current route path is ' + routePath)
			var markdownFile = path.join(cwd, 'src/markdown/', routePath + '.md')

			if (!fs.existsSync(markdownFile)) {
				fs.writeFileSync(markdownFile, "# " + markdownFile.replace(cwd, ''))
			}

			// console.log('try to find markdown file at ' + markdownFile)

			var markdownContent = fs.readFileSync(markdownFile, 'utf-8')
			var html = marked.parse(markdownContent)

			return html
		}
	}
}

</script>