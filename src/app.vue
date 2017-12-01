<template lang="pug">
	#app
		header.header
			.container
				h1 TODO LIST
		.main
			router-view.container
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>	
	@import './style/style.css';
	@import './style/reset.css';
	@import './style/public.css';

	.header {
		padding: 5px 0;
		background: #0866c6;
		color: #fff;
	}

	.main {
		margin-top: 20px;
	}
</style>