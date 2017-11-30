<template>
	<div class="todo_list">
		<a href="javascript: void(0);" class="todo_list_item" v-for="item in todoList" @click="goList(item.id)" :class="{'active': item.id === todoId}">{{ item.title }}</a>
		<a href="javascript: vodi(0);" class="todo_list_item todo_list_add" @click="addTodo()">CREATE</a>
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
		computed: {
			todoList() {
				return this.$store.getters.getTodoList
			}
		},
		created() {
			this.$store.dispatch('getTodo').then(() => {
				this.$nextTick(() => {
					this.goList(this.todoList[0].id)
				})
			})
		},
		methods: {
			goList(id) {
				this.todoId = id
			},
			addTodo() {
				addTodo({}).then(res => {
					this.$store.dispatch('getTodo').then(() => {
						this.$nextTick(() => {
							setTimeout(() => {
								this.goList(this.todoList[this.todoList.length - 1].id)
							}, 100)
						})
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