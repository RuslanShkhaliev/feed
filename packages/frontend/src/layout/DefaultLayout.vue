<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
</script>

<template>
	<div class="flex flex-col h-full">
		<TheHeader />
		<div class="flex flex-1 max-w-[1240px] w-full mx-auto">
			<TheSidebar />
			<main class="flex flex-col w-full">
				<RouterView />
			</main>
		</div>
	</div>
</template>

<style scoped></style>
