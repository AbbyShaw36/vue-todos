<template>
	<div class="record_list_item">
		<input type="checkbox" v-model="item.checked" @change="onChange">
		<span v-show="!edit">{{ item.text }}</span>
		<input type="text" class="todo_input" v-show="edit" v-model="item.text" v-focus @blur="onChange" @keyup.enter="onChange">
		<div class="todo_toolbar">
			<a href="javascript: void(0);" @click="onEdit" title="编辑" class="icon-edit"></a>
			<a href="javascript: void(0);" @click="onDelete" title="删除" class="icon-trashbin"></a>
		</div>
	</div>
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
				edit: false	
			}
		},
		methods: {
			onChange() {
				this.edit = false
				updateRecord({ id: this.id, index: this.index, item: this.item }).then(res => {
					this.$nextTick(() => {
						this.init()
					})
				})
			},
			onEdit() {
				this.edit = true
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

	.record_list_item input[type="checkbox"]:checked + span {
		text-decoration: line-through;
		color: #999;
	}
</style>