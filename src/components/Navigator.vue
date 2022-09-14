<template>
    <ul class="menu z-2">
        <li class="rounded-none" v-for="navigator in activeNavigator.children"
            v-bind:class="shouldBeActive(navigator) ? 'bordered' : ''">
            <router-link v-bind:to="getLink(navigator.name)" v-text="navigator.name">
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { unescape } from 'querystring'
import { defineComponent } from 'vue'
import { nav, navigatorNode } from '../models/nav'

export default defineComponent({
    data() {
        return {
            expand: false
        }
    },
    methods: {
        toggle() {
            this.expand = !this.expand
        },
        shouldBeActive(navigator: navigatorNode) {
            return navigator.name == unescape(this.$route.path).replace('/article/', '')
        },
        getLinkForDir(navigatorName: string) {
            return '/article/' + navigatorName + '@home'
        },
        getLink(navigatorName: string) {
            return '/article/' + navigatorName
        },
        getText(navigator: navigatorNode): string {
            let splitted = navigator.name.split('@')
            let text = splitted.pop()

            if (text === 'home') {
                return '首页'
            }

            return text === undefined ? '' : text;
        }
    },
    computed: {
        navigators() {
            // console.log('navigators are: ' + nav.getNavigators())
            return nav.getNavigators()
        },
        activeNavigator() {
            return nav.getActiveNavigator(this.$route.path)
        }
    }
})
</script>