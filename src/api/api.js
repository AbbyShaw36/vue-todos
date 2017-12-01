import axios from 'axios'

export const getTodoList = params => {
	return axios.get('/todo/list', {
		params: params
	})
}

export const addTodo = params => {
	return axios.post('/todo/addTodo', params).then(res => res.data)
}

export const getTodo = params => {
	return axios.get('/todo/listId', {
		params: params
	})
}

export const updateTodo = params => {
	return axios.put('/todo/updateTodo', params).then(res => res.data)
}

export const deleteTodo = params => {
	return axios.delete('/todo/deleteTodo', {
		params: params
	})
}

export const addRecord = params => {
	return axios.post('/todo/addRecord', params).then(res => res.data)
}

export const updateRecord = params => {
	return axios.put('/todo/updateRecord', params).then(res => res.data)
}

export const deleteRecord = params => {
	return axios.delete('/todo/deleteRecord', {
		params: params
	})
}