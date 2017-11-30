import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
import { Todos } from './data/todoList.js'

export default {
	start() {
		let mock = new MockAdapter(axios)

		mock.onGet('/todo/list').reply(config => {
			let mockTodo = Todos.map(todo => {
				return {
					id: todo.id,
					title: todo.title
				}
			})

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						todos: mockTodo
					}])
				}, 200)
			})
		})

		mock.onPost('/todo/addTodo').reply(config => {
			Todos.push({
				id: Mock.Random.guid(),
				title: 'newList',
				record: []
			})

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})

		mock.onGet('/todo/listId').reply(config => {
			let { id } = config.params

			let todo = Todos.find(todo => {
				return id && todo.id === id
			})

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						todo: todo
					}])
				}, 200)
			})
		})

		mock.onPost('/todo/addRecord').reply(config => {
			let { id, text} = JSON.parse(config.data)

			Todos.some((t, index) => {
				if (t.id === id) {
					t.record.push({
						text: text,
						checked: false
					})
					return true
				}
			})

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})
	}
}