<template>
	<div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar"></div>

	<div class="h-12">
		<div class="bg-yellow-900 z-40 w-full flex flex-row fixed justify-between"
			v-bind:class="hideTitleBar ? 'mt-0' : 'mt-8'">
			<BookNavigator class="w-56 z-50"></BookNavigator>
			<Actions class="w-56 z-50"></Actions>
		</div>
	</div>

	<main class="flex flex-row">
		<div class="w-56">
			<div class="fixed w-56 h-screen">
				<Navigator></Navigator>
			</div>
		</div>
		<div class="flex-grow">
			<router-view></router-view>
		</div>
	</main>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Navigator from './Navigator.vue'
import Actions from './Actions.vue'
import BookNavigator from './BookNavigator.vue'
import Title from './Title.vue'

export default defineComponent({
	components: {
		Navigator,
		Actions,
		BookNavigator,
		Title
	},
	computed: {
		hideTitleBar: function () {
			return this.$store.state.full_screen;
		},
		path: function () {
			return this.$route.path.replace('/article', '')
		}
	},
})
</script>