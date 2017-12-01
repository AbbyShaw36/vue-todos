<template lang="pug">
	.todo(v-if="!isDeleted")
		.todo_head
			h2.todo_title
				input.todo_input(type="text", v-model="todo.title", @blur="onChange")
			.todo_toolbar
				a.icon-trashbin(@click="onDelete", title="删除")
		.todo_detail
			ul.record_list
				li.record_list_item(v-for="(item, index) in items")
					record(":item"="item", ":index"="index", ":id"="todo.id", ":init"="init")
				li.record_list_item.record_add
					input.todo_input_add(type="text", v-model="text", placeholder="Add new todo", @keyup.enter="onCreate")
</template>

<script>
	import { getTodo, addRecord, updateTodo, deleteTodo } from '../api/api'
	import record from './record.vue'

	export default {
		data() {
			return {
				todo: {},
				items: [],
				isDeleted: false
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				const ID = this.$route.params.id

				getTodo({ id: ID }).then(res => {
					let { id, title, record } = res.data.todo

					this.items = record
					this.todo = {
						id: id,
						title: title
					}
				})
			},
			onChange() {
				updateTodo({ id: this.todo.id, title: this.todo.title }).then(res => {
					this.$store.dispatch('getTodo')
				})
			},
			onCreate() {
				addRecord({ id: this.todo.id, text: this.text }).then (res => {
					this.$nextTick(() => {
						this.text = '',
						this.init()
					})
				})
			},
			onDelete() {
				if (confirm("是否删除该代办列表？")) {

					deleteTodo({ id: this.todo.id }).then(res => {
						this.$store.dispatch('getTodo')
						this.isDeleted = true
						this.$nextTick()
					})
				}
			}
		},
		watch: {
			'$route.params.id'() {
				this.isDeleted = false
				this.init()
			}
		},
		components: {
			record
		}
	}
</script>

<style>
	.todo_head {
		position: relative;
		overflow: hidden;
		margin: 20px 0;
		line-height: 40px;
		font-size: 28px;
	}

	.todo_title {
		float: left;
	}

	.todo_toolbar {
		float: right;
		margin-left: 20px;
	}

	.todo_toolbar a {
		color: #0866c6;
	}

	.todo_input {
		width: 80%;
		border: none;
	}

	.todo_head .todo_input {
		font-size: 28px;
		font-weight: bold;
	}

	.todo_input_add {
		width: 50%;
		height: 30px;
		line-height: 28px;
		font-size: 16px;
		padding: 0 10px;
	}

	.record_list {
		margin: 0;
		padding: 0;
	}
</style>