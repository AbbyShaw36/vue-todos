<template lang="pug">
	div
		menus.todo_menu
		todo.todo_content
</template>

<script>
	import menus from './menus'
	import todo from './todo'

	export default {
		components: {
			menus,
			todo
		}
	}
</script>

<style>
	.todo_menu {
		float: left;
		width: 20%;
		padding: 10px 20px 20px;
		border: 1px solid #dcdcdc;
	}

	.todo_content {
		margin-left: 20%;
		padding: 0 20px;
	}

</style>