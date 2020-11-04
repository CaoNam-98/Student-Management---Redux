import * as types from './../constants/ActionTypes';
var randomstring = require("randomstring");

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var findIndex = (tasks, id) => {
	var location = -1;
	tasks.forEach((item, index) => {
		if(item.id === id){
			location = index;
			return location;
		}
	})
	return location;
}

var myReducer = (state = initialState, action) => { // myReducer là 1 hàm
	switch(action.type){
		case types.LIST_ALL:
			return [...state];

		case types.ADD_TASK:
			if(action.task.id === ''){
				var newTask = {
					id: randomstring.generate(7),
	                mssv: action.task.mssv,
	                tensv: action.task.tensv,
	                diemNMLT: parseInt(action.task.diemNMLT),
	                diemLTHDT: parseInt(action.task.diemLTHDT),
	                diemCTDL: parseInt(action.task.diemCTDL),
	                status: action.task.status === 'true' ? true : false,
				}
				state.push(newTask);
			}else{
				var location = findIndex(state, action.task.id);
				var Task = {
					id: action.task.id,
	                mssv: action.task.mssv,
	                tensv: action.task.tensv,
	                diemNMLT: parseInt(action.task.diemNMLT),
	                diemLTHDT: parseInt(action.task.diemLTHDT),
	                diemCTDL: parseInt(action.task.diemCTDL),
	                status: action.task.status === 'true' ? true : false,
				}
				state[location] = Task;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.UPDATE_STATUS:
			var indexUpdateStatus = findIndex(state, action.id);
			if(indexUpdateStatus !== -1){ //Khi muốn thay đổi object thì phải làm như thế này chứ thay đổi giá trị key thì view không nhìn thấy
				var cloneTask = {...state[indexUpdateStatus]}; // lấy ra các key: value và đặt bên trong {}
				cloneTask.status = !cloneTask.status;
				state[indexUpdateStatus] = cloneTask;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.DELETE_TASK:
			var indexDeleteTask = findIndex(state, action.id);
			if(indexDeleteTask !== -1){
				state.splice(indexDeleteTask, 1);
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		default: 
			return [...state];
	}
}

export default myReducer;