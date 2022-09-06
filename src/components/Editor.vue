<template>
    <div class="w-full flex flex-row justify-start gap-24 px-0">
        <div class="ml-48 w-full">
            <mavon-editor class="shadow-none" v-model="html" :externalLink="external_link" v-on:change="save" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import markdown from '/src/models/markdown.ts'

export default defineComponent({
    props: ['path'],
    data() {
        return {
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
            markdown.writeToMarkdownFile(this.path.replace('@', '/'), this.html)
        },
        getHtml: function () {
            return markdown.getMarkdownContent(this.$route.path)
        }
    },
})

</script>