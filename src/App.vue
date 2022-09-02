<script setup lang="ts">

import Nodejs from './views/Nodejs.vue'
import Sidebar from './components/Sidebar.vue'
import VueJs from './views/VueJs.vue'
import Process from './components/Process.vue'

</script>

<template>
	<div class="mb-8 justify-center flex">
		<Process></Process>
	</div>

	<div class="bg-base-100 min-h-screen min-w-full  flex flex-row gap-4">
		<div>
			<Sidebar></Sidebar>
		</div>
		<main class="container mx-auto bg-base-200 shadow-2xl p-4 rounded-2xl">
			<div>
				<Nodejs></Nodejs>
				<VueJs></VueJs>
			</div>
		</main>
	</div>
</template>