<template>
    <div class="dropdown fixed z-50 w-56">
        <label tabindex="0" class="btn m-0 w-full rounded-none">
            <span>{{activeNavigator.name}}</span>
            <svg class="fill-current ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow-2xl bg-info-content w-full z-50">
            <li v-for="navigator in navigators">
                <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name" class=""
                    active-class="active">
                </router-link>
            </li>
        </ul>
    </div>

    <ul class="menu bg-base-100 w-56 mt-12 sticky top-20 z-2">
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