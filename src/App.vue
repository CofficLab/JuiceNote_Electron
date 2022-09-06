<script setup lang="ts">

import Process from './components/Process.vue'

</script>

<template>
	<div>
		<div class="h-16 z-50">
			<Process></Process>
		</div>

		<main class="bg-gradient-to-b from-cyan-700/40 to-blue-900/40">
			<router-view></router-view>
		</main>
	</div>
</template>