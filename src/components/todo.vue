<template>
	<div class="todo" v-if="!isDeleted">
		<div class="todo_head">
			<h1 class="todo_title">
				<span v-show="!edit">{{ todo.title }}</span>
				<input class="todo_input" type="text" v-model="todo.title" v-focus v-show="edit" @blur="onChange" @keyup.enter="onChange">
			</h1>
			<div class="todo_toolbar">
				<a href="javascript: void(0);" @click="edit = true" title="编辑" class="icon-edit"></a>
				<a href="javascript: void(0);" @click="onDelete" title="删除" class="icon-trashbin"></a>
			</div>
		</div>
		<div class="todo_detail">
			<div class="record_list">
				<div v-for="(item, index) in items">
					<record :item="item" :index="index" :id="todo.id" :init="init"></record>
				</div>
				<div class="record_list_item record_add"><input type="text" class="todo_input_add" v-model="text" placeholder="Add new todo" @keyup.enter="onCreate"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getTodo, addRecord, updateTodo, deleteTodo } from '../api/api'
	import record from './record.vue'

	export default {
		data() {
			return {
				todo: {},
				items: [],
				edit: false,
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
					this.edit = false
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
</style>