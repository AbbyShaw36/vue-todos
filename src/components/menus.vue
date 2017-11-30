<template>
	<div class="todo_list">
		<a href="javascript: void(0);" class="todo_list_item" v-for="item in items" @click="goList(item.id)" :class="{'active': item.id === todoId}">{{ item.title }}</a>
		<a href="javascript: vodi(0);" class="todo_list_item todo_list_add" @click="createItem()">CREATE</a>
	</div>
</template>

<script>
	import { getTodoList, addTodo } from '../api/api'

	export default {
		data() {
			return {
				items: [],
				todoId: ''
			}
		},
		created() {
			getTodoList({}).then(res => {
				const TODOS = res.data.todos
				this.items = TODOS
				this.todoId = TODOS[0].id
			})
		},
		methods: {
			goList(id) {
				this.todoId = id
			},
			createItem() {
				addTodo({}).then(res => {
					getTodoList({}).then(res => {
						const TODOS = res.data.todos
						this.items = TODOS
						this.todoId = TODOS[TODOS.length - 1].id
					})
				})
			}
		},
		watch: {
			'todoId'(id) {
				this.$router.push({
					name: 'todo',
					params: {
						id: id
					}
				})
			}
		}
	};
</script>

<style>
	.todo_list {
		float: left;
	}

	.todo_list_item {
		display: block;
		color: #333;
	}

	.todo_list_item.active {
		color: #0866c6;
	}
</style>