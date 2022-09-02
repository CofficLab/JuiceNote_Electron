<script setup lang="ts">

import Nodejs from './views/Nodejs.vue'
import Sidebar from './components/Sidebar.vue'
import VueJs from './views/VueJs.vue'
import Process from './components/Process.vue'
import Books from './views/Books.vue'

</script>

<template>
	<div>
		<div class="py-8 justify-center flex flex-col bg-gradient-to-r from-sky-400 to-cyan-800/80">
			<Process></Process>

			<div class="btn-group flex justify-center mt-2">
				<button class="btn">1</button>
				<button class="btn btn-active">2</button>
				<button class="btn">3</button>
				<button class="btn">4</button>
			</div>
		</div>

		<main class="bg-gradient-to-b from-cyan-700/30 to-blue-900/20 shadow-2xl p-4">
			<div class="container">
				<div class="flex justify-center">
					<!-- <Nodejs></Nodejs> -->
					<VueJs></VueJs>
				</div>
			</div>
		</main>

		<div>
			<Books></Books>
		</div>
	</div>
</template>