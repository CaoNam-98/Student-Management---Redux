import React, { Component } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
var randomstring = require("randomstring");

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: 'admin123',
            passWord: '123456',
            tasks: [],
            openForm : false,
            taskEditing: null,
            filterName: '',
            filterStatus: -1,
            searchName: null,
            sortName: null,
            sortValue: null,
        };
        this.onOpenForm = this.onOpenForm.bind(this);
    }

    onOpenForm(){
        if(this.state.taskEditing !== null){
            this.setState({
                taskEditing: null,
            })
        }else{
            this.setState({
                openForm: !this.state.openForm,
            })
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id: randomstring.generate(7),
                mssv: '16521847',
                tensv: 'Nguyễn Minh Tuấn',
                diemNMLT: 10,
                diemLTHDT: 8,
                diemCTDL: 6,
                status: true,
            },
            {
                id: randomstring.generate(7),
                mssv: '16521556',
                tensv: 'Nguyễn Trọng Nhân',
                diemNMLT: 9,
                diemLTHDT: 7,
                diemCTDL: 9,
                status: false,
            },
            {
                id: randomstring.generate(7),
                mssv: '16521446',
                tensv: 'Nguyễn Minh Khôi',
                diemNMLT: 9,
                diemLTHDT: 9,
                diemCTDL: 4,
                status: true,
            },
            {
                id: randomstring.generate(7),
                mssv: '16521416',
                tensv: 'Cao Thị Kiều Oanh',
                diemNMLT: 9,
                diemLTHDT: 10,
                diemCTDL: 10,
                status: false,
            }
        ];

        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        data.diemNMLT = parseInt(data.diemNMLT, 10);
        data.diemLTHDT = parseInt(data.diemLTHDT, 10);
        data.diemCTDL = parseInt(data.diemCTDL, 10);
        data.status = data.status === 'true' ? true : false;
        if(data.id === ''){
            data.id = randomstring.generate(7);
            tasks.push(data);
        }else{
            var locateItem = this.onFindItem(data.id);
            tasks[locateItem] = data;
        }

        this.setState({
            tasks: tasks,
        })
        this.onExitForm();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onFindItem = (id) => {
        var {tasks} = this.state;
        var location = -1;
        tasks.forEach((item, index) => {
            if(item.id === id){
                location = index;
            }
        })
        return location;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var locateItem = this.onFindItem(id);
        tasks.splice(locateItem, 1);
        this.setState({
            tasks: tasks,
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var locateItem = this.onFindItem(id);
        this.setState({
            taskEditing: tasks[locateItem],
            openForm: true,
        });
    }

    onExitForm = () => {
        this.setState({
            openForm: false,
            taskEditing: null,
        })
    }

    onSearchFilter = (filterName, filterStatus) => {
        this.setState({
            filterName: filterName,
            filterStatus: filterStatus,
        })
    }

    onSearchName = (searchName) => {
        this.setState({
            searchName: searchName,
        })
    }

    onSort = (Name, Value) => {
        this.setState({
            sortName: Name,
            sortValue: Value,
        })
    }

    render(){
        var { tasks, filterName, filterStatus, searchName, sortName, sortValue } = this.state;
        // Lọc theo tên
        if(filterName !== ''){
            tasks = tasks.filter((item, index) => {
                return item.tensv.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
            })
        }

        // Lọc theo trạng thái status
        var status = filterStatus === '1' ? true : filterStatus === '0' ? false : -1;
        if(status !== -1){
            tasks = tasks.filter((item, index) => {
                return item.status === status;
            })
        }
        
        // Tìm kiếm theo tên
        if(searchName){
            tasks = tasks.filter((item, index) => {
                return item.tensv.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
            })
        }

        // Sort theo họ tên từ bé đến lớn (a - b)
        if(sortName === 'name' && sortValue === 1){
            tasks.sort((a, b) => {
                if(a.tensv < b.tensv){ // a.tensv nhỏ hơn b.tensv => a lên trước b
                    return -1;
                }else if(a.tensv > b.tensv){ // a.tensv lớn hơn b.tensv => b lên trước a
                    return 1;
                }else{
                    return 0; // bằng nhau thì giữ nguyên
                }
            });
        }

        // Sort theo họ tên từ lớn đến bé (b - a)
        if(sortName === 'name' && sortValue === -1){
            tasks.sort((a, b) => {
                if(a.tensv < b.tensv){ // a.tensv nhỏ hơn b.tensv => b lên trước a
                    return 1;
                }else if(a.tensv > b.tensv){ // a.tensv lớn hơn b.tensv => a lên trước b
                    return -1;
                }else{
                    return 0; // bằng nhau thì giữ nguyên
                }
            });
        }

        // Sort theo status từ lớn đến bé (b-a)
        if(sortName === 'status' && sortValue === 1){
            tasks.sort((a, b) => {
                if(a.status < b.status){ // => b đứng trước a
                    return 1;
                }else if(a.status > b.status){ // => a đứng trước b
                    return -1;
                }else{
                    return 0; // bằng nhau thì giữ nguyên
                }
            });
        }
      
        // Sort theo status từ bé đến lớn (a-b)
        if(sortName === 'status' && sortValue === -1){
            tasks.sort((a, b) => {
                if(a.status < b.status){ //a.status bé hơn b.status => a đứng trước b
                    return -1;
                }else if(a.status > b.status){  // a.status lớn hơn b.status => b đứng trước a
                    return 1;
                }else{
                    return 0; // bằng nhau nên giữ nguyên
                }
            });
        }

        var element = this.state.openForm === true ? <Tasks onSubmit={ this.onSubmit } onTaskEditing={ this.state.taskEditing } onExitForm={ this.onExitForm }/> : '';
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className={ this.state.openForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                            { element }
                        </div>
                        <div className={ this.state.openForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <button type="button" className="btn btn-primary" onClick={ this.onOpenForm }>
                                <span className="fa fa-plus mr-5"></span>&nbsp;Thêm Sinh Viên
                            </button>&ensp;
                            <button type="button" className="btn btn-danger" onClick={ this.onGenerateData }>
                                Generate Data
                            </button>
                            <Control onSearchName={ this.onSearchName } onSort={ this.onSort }/>
                            <div className="row mt-15">
                                <TaskList tasks={ tasks } onDelete={ this.onDelete } onUpdate={ this.onUpdate } SearchFilter={ this.onSearchFilter }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
