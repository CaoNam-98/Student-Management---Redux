import * as types from './../constants/ActionTypes.js';

var initialSort = {
};

var myReducer = (state = initialSort, action) => {
	switch(action.type){
		case types.SORT:
			return {
				sortName: action.sortName,
				sortValue: action.sortValue,
			};

		default:
			return state;
	}
}

export default myReducer;