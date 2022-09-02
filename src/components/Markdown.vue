<template>
	<div class="prose">
		<div v-html="html"></div>
	</div>
</template>

<script lang="ts">
import fs from 'fs'
import path from 'path'
var markdown = require("markdown").markdown

export default {
	props: ['path'],
	computed: {
		html(): string {
			var cwd = process.cwd()
			var markdownFile = path.join(cwd, 'src/markdown/', this.path + '.md')
			console.log(markdownFile)
			if (!fs.existsSync(markdownFile)) {
				markdownFile = path.join(cwd, 'src/markdown/', this.path + '/home.md')
			}

			if (!fs.existsSync(markdownFile)) {
				fs.writeFileSync(markdownFile, "# " + markdownFile.replace(cwd, ''))
			}

			var markdownContent = fs.readFileSync(markdownFile, 'utf-8')
			var html = markdown.toHTML(markdownContent)

			return html
		}
	}
}

</script>