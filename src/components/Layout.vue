<template>
	<div class="h-8 bg-stone-900 fixed top-0 z-50 w-full" id="title-bar" v-show="!hideTitleBar">
	</div>
	<div v-bind:class="hideTitleBar ? 'pt-0' : 'pt-8'">
		<div class="h-16 z-40">
			<Process></Process>
		</div>

		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Process from './Process.vue'

export default defineComponent({
	components: {
		Process
	},
	computed: {
		hideTitleBar: function () {
			return this.$store.state.full_screen;
		}
	},
})
</script>