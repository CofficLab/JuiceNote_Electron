<script setup lang="ts">

import Nodejs from './views/Nodejs.vue'
import Sidebar from './components/Sidebar.vue'
import VueJs from './views/VueJs.vue'

</script>

<template>
	<div class="bg-base-100 min-h-screen min-w-full  flex flex-row gap-4">
		<div>
			<Sidebar></Sidebar>
		</div>
		<main class="container mx-auto bg-base-200 shadow-2xl px-4">
			<div>
				<Nodejs></Nodejs>
				<VueJs></VueJs>
			</div>
		</main>
	</div>
</template>