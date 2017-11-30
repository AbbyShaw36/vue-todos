<template>
	<section class="container">
		<section class="todo_menu">
			<menus></menus>
		</section>
		<section class="todo_content">
			<todo></todo>
		</section>
	</section>
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
		width: 200px;
		float: left;
	}

	.todo_list_item {
		display: block;
		color: #333;
	}

	.todo_list_item.active {
		color: #0866c6;
	}

	.todo_content {
		margin-left: 220px;
	}
</style>