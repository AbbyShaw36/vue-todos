<template>
	<div class="record_list_item">
		<input type="checkbox" v-model="item.checked" @change="onChange">
		<span v-show="!edit">{{ item.text }}</span>
		<input type="text" v-show="edit" v-model="item.text" v-focus @blur="onChange" @keyup.enter="onChange">
		<div class="toolbar">
			<a href="javascript: void(0);" @click="onEdit">编辑</a>
			<a href="javascript: void(0);" @click="onDelete">删除</a>
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