import { getTodoList } from '../api/api.js'

export const getTodo = ({ commit }) => {
	return  new Promise((resolve) => {
		getTodoList().then(res => {
			commit('EDITTODO', res.data.todos)
			resolve()
		})
	})
}