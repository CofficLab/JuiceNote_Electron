<template>
    <ul class="steps steps-horizontal">
        <template v-for="category in categories">
            <li class="step" active-class="step-primary">
                <router-link v-bind:to="getLink(category)" v-text="category">
                </router-link>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
import path from 'path'
import fs from 'fs'

export default {
    methods: {
        getLink(category: string) {
            return '/article/' + category
        }
    },
    computed: {
        categories(): string[] {
            var categories: string[] = []
            var files = fs.readdirSync(path.join(process.cwd(), 'src/markdown'), 'utf-8')
            files.forEach((element) => {
                var filePath = path.join(process.cwd(), 'src/markdown/' + element)
                var stat = fs.lstatSync(filePath)

                if (stat.isDirectory()) {
                    categories.push(element)
                }
            })

            console.log(categories)

            return categories
        }
    }
}
</script>