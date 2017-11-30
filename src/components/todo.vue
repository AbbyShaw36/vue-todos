<template>
	<div class="page">
		<h1 class="page_title">{{ todo.title }}</h1>
		<div class="page_content">
			<ul class="todo_list">
				<li class="todo_list_item" v-for="item in items"><input type="checkbox"><span>{{ item.text }}</span></li>
				<li class="todo_list_item todo_add"><input type="text" v-model="text" placeholder="Add new todo" @keyup.enter="onAdd"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { getTodo, addRecord } from '../api/api'

	export default {
		data() {
			return {
				todo: {},
				items: []
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
			onAdd() {
				const ID = this.$route.params.id
				
				addRecord({ id: ID, text: this.text }).then (res => {
					this.text = ''
					this.init()
				})
			}
		},
		watch: {
			'$route.params.id'() {
				this.init()
			}
		}
	}
</script>