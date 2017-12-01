<template lang="pug">
	div.record_list_item
		label.checkbox
			input(type="checkbox", v-model="item.checked", @change="onChange")
			span
		input.todo_input(type="text", v-model="item.text", @blur="onChange")
		.todo_toolbar
			a.icon-close.red(@click="onDelete", title="删除")
</template>

<script>
	import { updateRecord, deleteRecord } from '../api/api'

	export default {
		props: {
			item: {
				type: Object
			},
			index: {},
			id: {},
			init: {}
		},
		data() {
			return {
			}
		},
		methods: {
			onChange() {
				updateRecord({ id: this.id, index: this.index, item: this.item }).then(res => {
					this.$nextTick(() => {
						this.init()
					})
				})
			},
			onDelete() {
				deleteRecord({ id : this.id, index: this.index }).then(res => {
					this.$nextTick(() => {
						this.init()
					})
				})
			}
		}
	}
</script>

<style>
	.record_list_item {
		line-height: 40px;
	}

	.record_list_item input[type="checkbox"]:checked + span input {
		text-decoration: line-through;
		color: #999;
	}

	.record_list_item .todo_toolbar {
		display: none;
	}

	.record_list_item:hover .todo_toolbar {
		display: block;
	}
</style>