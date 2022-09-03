<template>
    <ul class="steps steps-horizontal">
        <template v-for="navigator in navigators">
            <li data-content="●" class="step">
                <router-link v-bind:to="getLink(navigator.name)" v-text="navigator.name" active-class="text-blue-400">
                </router-link>
            </li>
        </template>
    </ul>

    <div class="tabs tabs-boxed rounded-none">
        <template v-for="child in activeNavigator.children">
            <router-link class="tab" v-bind:to="child.name" v-text="child.name" active-class="tab-active">
            </router-link>
        </template>
    </div>
</template>

<script lang="ts">
import { navigators } from '../nav'

console.log('all navigators are ', JSON.stringify(navigators))

export default {
    methods: {
        getLink(navigatorName: string) {
            return '/article' + navigatorName + '@home'
        }
    },
    computed: {
        navigators() {
            return navigators
        },
        activeNavigator() {

            console.log(navigators[0])

            return navigators[0]
        }
    }
}
</script>