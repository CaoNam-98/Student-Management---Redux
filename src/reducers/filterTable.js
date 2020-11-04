import * as types from './../constants/ActionTypes.js';
// Nếu khi được gọi lại thì nó sẽ chạy từ trên xuống dưới => initialEditing === {}
var initialEditing = {
	searchName: '',
    searchStatus: null,
};

var myReducer = (state = initialEditing, action) => {
	switch(action.type){
		case types.FILTER_TABLE:
			return action.filter;

		default:
			return state;
	}
}

export default myReducer;