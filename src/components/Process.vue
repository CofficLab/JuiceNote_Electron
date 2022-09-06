<template>
    <div class="navbar fixed bg-base-100 z-50 bg-opacity-80 shadow-2xl">
        <div class="navbar-start">
            <div class="dropdown">
                <label class="btn btn-ghost btn-circle" v-on:click="expand = !expand"
                    v-bind:class="expand ? 'btn-active':''">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <ul v-show="expand"
                    class="menu menu-compact absolute mt-2 p-2 shadow-2xl shadow-cyan-600 bg-base-200 bg-opacity-95 rounded-box w-52 overflow-scroll h-96">
                    <li v-for="navigator in navigators">
                        <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
                <li v-for="child in activeNavigator.children">
                    <router-link v-bind:to="getLink(child.name)" v-text="getText(child)" active-class="active">
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import nav from '../models/nav'

export default defineComponent({
    data() {
        return {
            expand: false
        }
    },
    methods: {
        getLinkForDir(navigatorName: string) {
            return '/article/' + navigatorName + '@home'
        },
        getLink(navigatorName: string) {
            return '/article/' + navigatorName
        },
        getText(navigator) {
            let splitted = navigator.name.split('@')
            let text = splitted.pop()

            return text === 'home' ? '首页' : text;
        }
    },
    computed: {
        navigators() {
            // console.log('navigators are: ' + nav.getNavigators())
            return nav.getNavigators()
        },
        activeNavigator() {
            let activeNavigator = new nav.navigatorNode

            // console.log('active route path is ' + this.$route.path)

            nav.getNavigators().forEach((navigator: any) => {
                if (nav.shouldBeActive(navigator, this.$route.path)) {
                    activeNavigator = navigator
                }
            })

            // console.log('activeNavigator', activeNavigator)

            return activeNavigator
        }
    }
})
</script>