<template>
    <div class="mt-4">
        <div class="tabs tabs-boxed rounded-none">
            <template v-for="navigator in navigators">
                <router-link class="tab" v-bind:to="navigator" v-text="navigator" active-class="tab-active">
                </router-link>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import path from 'path'
import fs from 'fs'

export default {
    methods: {
        getParentPath() {
            var markdownPath = path.join(process.cwd(), 'src/markdown')
            var parentPath = this.getParentFilePath().replace(markdownPath, '')

            console.log('parent path is ' + parentPath)
            return parentPath
        },
        getParentFilePath(): string {
            var markdownPath = path.join(process.cwd(), 'src/markdown')
            var currentPath = path.join(markdownPath, this.$route.path.replace('article', '').replace('@', '/'))
            console.log('current path ' + currentPath)

            if (fs.existsSync(currentPath + '.md')) {
                fs.writeFileSync(currentPath + '.md', '# ' + currentPath)
            }

            return path.dirname(currentPath + '.md')
        }
    },
    computed: {
        navigators(): string[] {
            var navigators: string[] = []
            var parentPath = this.getParentFilePath()

            fs.readdirSync(parentPath).forEach((element) => {
                navigators.push('/article' + this.getParentPath() + '@' + element.replace('.md', ''))
            })

            console.log('navigators ' + navigators)

            return navigators
        }
    }
}
</script>