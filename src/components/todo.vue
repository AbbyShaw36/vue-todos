<template>
	<div class="page" v-if="!isDeleted">
		<div class="page_head">
			<h1 class="page_title">
				<span v-show="!edit">{{ todo.title }}</span>
				<input type="text" v-model="todo.title" v-focus v-show="edit" @blur="onChange" @keyup.enter="onChange">
			</h1>
			<div class="toolbar">
				<a href="javascript: void(0);" @click="edit = true">编辑</a>
				<a href="javascript: void(0);" @click="onDelete">删除</a>
			</div>
		</div>
		<div class="page_content">
			<div class="record_list">
				<div v-for="(item, index) in items">
					<record :item="item" :index="index" :id="todo.id" :init="init"></record>
				</div>
				<div class="record_list_item record_add"><input type="text" v-model="text" placeholder="Add new todo" @keyup.enter="onCreate"></div>
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