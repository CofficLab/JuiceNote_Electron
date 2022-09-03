<script setup lang="ts">

import Process from './components/Process.vue'

</script>

<template>
	<div>
		<Process></Process>

		<main class="bg-gradient-to-b from-cyan-700/30 to-blue-900/20 shadow-2xl p-4">
			<div class="container">
				<div class="flex justify-center">
					<router-view></router-view>
				</div>
			</div>
		</main>
	</div>
</template>