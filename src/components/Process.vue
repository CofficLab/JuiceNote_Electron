<template>
    <ul class="steps steps-horizontal">
        <template v-for="navigator in navigators">
            <li data-content="●" class="step">
                <router-link v-bind:to="getLinkForDir(navigator.name)" v-text="navigator.name"
                    active-class="text-blue-400">
                </router-link>
            </li>
        </template>
    </ul>

    <div class="tabs tabs-boxed rounded-none">
        <template v-for="child in activeNavigator.children">
            <router-link class="tab" v-bind:to="getLink(child.name)" v-text="child.name" active-class="tab-active">
            </router-link>
        </template>
    </div>
</template>

<script lang="ts">
import { getBlinkMemoryInfo } from 'process'
import { navigators } from '../nav'

// console.log('all navigators are ', JSON.stringify(navigators))

export default {
    methods: {
        getLinkForDir(navigatorName: string) {
            return '/article' + navigatorName + '@home'
        },
        getLink(navigatorName: string) {
            return '/article/' + navigatorName.replaceAll('/', '@')
        }
    },
    computed: {
        navigators() {
            return navigators
        },
        activeNavigator() {

            // console.log(navigators[0])
            console.log('active route path is ' + this.$route.path)

            // navigators.forEach((navigator) => {
            //     console.log(navigator.name)
            // })

            return navigators[0]
        }
    }
}
</script>