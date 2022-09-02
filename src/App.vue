<script setup lang="ts">

import Process from './components/Process.vue'
import Navigator from './components/Navigator.vue'

</script>

<template>
	<div>
		<div class="py-8 justify-center flex flex-col bg-gradient-to-r from-sky-600/90 to-cyan-800/80">
			<Process></Process>
			<Navigator></Navigator>
		</div>

		<main class="bg-gradient-to-b from-cyan-700/30 to-blue-900/20 shadow-2xl p-4">
			<div class="container">
				<div class="flex justify-center">
					<router-view></router-view>
				</div>
			</div>
		</main>
	</div>
</template>