import * as types from './../constants/ActionTypes';

export const listAll = () => {
	return {
		type: types.LIST_ALL
	}
}

export const addTask = (task) => {
	return {
		type: types.ADD_TASK, // 2 cai nay duoc gan cho action
		task // task : task
	}
}

export const isDisplayForm = () => {
	return {
		type: types.IS_DISPLAY_FORM,
	}
}

export const openForm = () => {
	return {
		type: types.OPEN_FORM,
	}
}

export const closeForm = () => {
	return {
		type: types.CLOSE_FORM,
	}
}

export const updateStatus = (id) => {
	return {
		type: types.UPDATE_STATUS,
		id,
	}
}

export const deleteTask = (id) => {
	return {
		type: types.DELETE_TASK,
		id,
	}
}

export const updateTask = (task) => {
	return {
		type: types.UPDATE_TASK,
		task,
	}
}

export const filterTable = (filter) => {
	return {
		type: types.FILTER_TABLE,
		filter,
	}
}

export const searchName = (searchName) => {
	return {
		type: types.SEARCH_NAME,
		searchName,
	}
}

export const sort = (sortName, sortValue) => {
	return {
		type: types.SORT,
		sortName,
		sortValue,
	}
}