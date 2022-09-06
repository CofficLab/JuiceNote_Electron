<script setup lang="ts">

import Process from './components/Process.vue'

</script>

<template>
	<div class="">
		<div class="h-16 z-50">
			<Process></Process>
		</div>

		<main>
			<router-view></router-view>
		</main>
	</div>
</template>