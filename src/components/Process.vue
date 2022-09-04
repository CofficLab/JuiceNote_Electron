<template>

    <div class="pt-8 justify-center flex flex-col bg-gradient-to-r from-sky-600/90 to-cyan-800/80">
        <ul class="steps steps-horizontal pb-8">
            <template v-for="navigator in navigators">
                <li data-content="●" class="step w-48">
                    <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name" class="text-blue-600"
                        v-if="navigator == activeNavigator">
                    </router-link>

                    <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name" v-else>
                    </router-link>
                </li>
            </template>
        </ul>

        <div class="tabs tabs-boxed rounded-none bg-base-200 py-0">
            <template v-for="child in activeNavigator.children">
                <router-link class="tab" v-bind:to="getLink(child.name)" v-text="getText(child)"
                    active-class="tab-active">
                </router-link>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { navigators, shouldBeActive, navigatorNode } from '../nav'

export default {
    methods: {
        getLinkForDir(navigatorName: string) {
            return '/article/' + navigatorName + '@home'
        },
        getLink(navigatorName: string) {
            return '/article/' + navigatorName
        },
        getText(navigator: navigatorNode) {
            let splitted = navigator.name.split('@')
            let text = splitted.pop()

            return text === 'home' ? '首页' : text;
        }
    },
    computed: {
        navigators() {
            return navigators
        },
        activeNavigator(): navigatorNode {
            let activeNavigator = new navigatorNode

            // console.log('active route path is ' + this.$route.path)

            navigators.forEach((navigator) => {
                if (shouldBeActive(navigator, this.$route.path)) {
                    activeNavigator = navigator
                    // console.log(navigator.name + ' should be active')
                }
            })

            return activeNavigator
        }
    }
}
</script>