<template>
	<div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar">
	</div>
	<div v-bind:class="hideTitleBar ? 'pt-0' : 'pt-8'" class="flex flex-row">
		<!-- 左侧栏 -->
		<aside class="z-40 w-56">
			<Navigator></Navigator>
		</aside>

		<!-- 正文 -->
		<main class="flex flex-grow">
			<router-view></router-view>
		</main>

		<!-- 右侧栏 -->
		<aside class="z-40 w-56">
			<Actions />
			<Toc :path="this.$route.path.replace('/article/','')" />
		</aside>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Navigator from './Navigator.vue'
import Toc from './Toc.vue'
import Actions from './Actions.vue'

export default defineComponent({
	components: {
		Navigator,
		Toc,
		Actions
	},
	computed: {
		hideTitleBar: function () {
			return this.$store.state.full_screen;
		}
	},
})
</script>