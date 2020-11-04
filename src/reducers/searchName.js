import * as types from './../constants/ActionTypes.js';

var initialSearchName = '';

var myReducer = (state = initialSearchName, action) => {
	switch(action.type){
		case types.SEARCH_NAME:
			return action.searchName;

		default:
			return state;
	}
}

export default myReducer;