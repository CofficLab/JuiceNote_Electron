<template>
    <div class="w-full flex flex-row justify-start gap-24 px-0">
        <div class="ml-48 w-full">
            <mavon-editor class="shadow-none" v-model="html" :externalLink="external_link" />
        </div>
    </div>
</template>

<script lang="ts">
import fs from 'fs'
import path from 'path'
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['path'],
    data() {
        return {
            // path: '',
            html: '',
            external_link: {
                markdown_css: function () {
                    return '/src/assets/github-markdown.min.css'
                },
                hljs_js: function () {
                    return '/src/assets/hightlight.min.js'
                },
                katex_js: function () {
                    return '/src/assets/katex.min.js'
                },
                katex_css: '/src/assets/katex.min.css',
                hljs_lang: function (lang: string) {
                    return (
                        'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/languages/' +
                        lang +
                        '.min.js'
                    );
                },
                hljs_css: function (css: string) {
                    if (css) {
                        return (
                            'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.3.1/styles/' +
                            css +
                            '.min.css'
                        );
                    }
                    return '';
                },
            }
        }
    },
    mounted() {
        this.html = this.getHtml()
    },
    methods: {
        getHtml: function () {
            let cwd = process.cwd()
            var routePath = this.path.replace('@', '/')

            var markdownFile = path.join(cwd, 'src/markdown/', routePath + '.md')

            if (!fs.existsSync(markdownFile)) {
                fs.writeFileSync(markdownFile, "# " + markdownFile.replace(cwd, ''))
            }

            // console.log('try to find markdown file at ' + markdownFile)

            var markdownContent = fs.readFileSync(markdownFile, 'utf-8')

            return markdownContent
        }
    },
})

</script>