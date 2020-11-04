import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './displayForm';
import TaskEditing from './itemEditing';
import filterTable from './filterTable';
import searchName from './searchName';
import sort from './sort';

const myReducer = combineReducers({ // myReducer tổng chứa các reducers Các reducer con
	tasks, // tasks: tasks
	isDisplayForm,
	TaskEditing,
	filterTable,
	searchName,
	sort,
});

export default myReducer;