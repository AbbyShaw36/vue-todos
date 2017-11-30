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