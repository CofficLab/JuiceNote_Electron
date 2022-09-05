<script setup lang="ts">

import Process from './components/Process.vue'

</script>

<template>
	<div>
		<Process></Process>

		<main class="bg-gradient-to-b from-cyan-700/40 to-blue-900/40 pt-16">
			<router-view></router-view>
		</main>
	</div>
</template>