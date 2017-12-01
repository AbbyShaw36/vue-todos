<template lang="pug">
	div
		a.menu_item(v-for="item in todoList", @click="goList(item.id)" ":class"="{'active': item.id === todoId}") {{item.title}}
		a.menu_item.menu_item_create(@click="addTodo()") 新增
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

<style>
	.menu_item {
		display: block;
		line-height: 40px;
		color: #333;
	}

	.menu_item:before {
		margin-right: 10px;
		content: '\f03a';
		font-family: 'icomoon';
	}

	.menu_item.active {
		color: #0866c6;
	}

	.menu_item_create { 
		background: #0866c6;
		text-align: center;
		color: #fff;
	}

	.menu_item_create:before {
		content: '\f067';
	}
</style>