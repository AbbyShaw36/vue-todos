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

		mock.onPut('/todo/updateTodo').reply(config => {
			let { id, title } = JSON.parse(config.data)

			Todos.find((t, i) => {
				return t.id === id
			}).title = title

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})

		mock.onDelete('/todo/deleteTodo').reply(config => {
			let { id } = config.params

			let index = Todos.findIndex((t, i) => {
				return t.id === id
			})

			Todos.splice(index, 1)

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})

		mock.onPost('/todo/addRecord').reply(config => {
			let { id, text } = JSON.parse(config.data)

			Todos.find((t, i) => {
				return t.id === id
			}).record.push({
				text: text,
				checked: false
			})

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})

		mock.onPut('/todo/updateRecord').reply(config => {
			let { id, index, item } = JSON.parse(config.data)

			Todos.find((t, i) => {
				return t.id === id
			}).record[index] = item

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})

		mock.onDelete('/todo/deleteRecord').reply(config => {
			let { id, index } = config.params

			Todos.find((t, i) => {
				return t.id === id
			}).record.splice(index, 1)

			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200])
				}, 200)
			})
		})
	}
}