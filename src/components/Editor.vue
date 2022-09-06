<template>
    <div class="w-full flex flex-row justify-start gap-24 px-0">
        <div class="mr-64 w-full">
            <mavon-editor id="editor" v-model="html" :externalLink="external_link" v-on:save="save" class="h-screen"
                :navigation="true" :toolbarsBackground="toolbarsBackground" :toolbarsFlag="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import markdown from '../models/markdown'

export default defineComponent({
    props: ['path'],
    data() {
        return {
            toolbarsBackground: '#fbfbfb',
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
        save: function () {
            if (markdown.getMarkdownContent(this.path) != this.html) {
                console.log('保存文章')
                markdown.writeToMarkdownFile(this.path, this.html)
            } else {
                console.log('没有变化，不保存文章')
            }
        },
        getHtml: function () {
            return markdown.getMarkdownContent(this.path)
        }
    },
})

</script>
