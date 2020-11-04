import * as types from './../constants/ActionTypes.js';
// Nếu khi được gọi lại thì nó sẽ chạy từ trên xuống dưới => initialEditing === {}
var initialEditing = {
	id: '',
    mssv: '',
    tensv: '',
    diemNMLT: '',
    diemLTHDT: '',
    diemCTDL: '',
    status: true,
};

var myReducer = (state = initialEditing, action) => {
	switch(action.type){
		case types.UPDATE_TASK:
			return action.task;

		default:
			return state;
	}
}

export default myReducer;