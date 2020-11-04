import React, { Component } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions/index';

var randomstring = require("randomstring");

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: 'admin123',
            passWord: '123456',
            filterName: '',
            filterStatus: -1,
            searchName: null,
        };
    }

    onSubmitLogin = (user) => {
        if(user.username === this.state.userName && user.password === this.state.passWord){
            alert('Success Login !');
        }else{
            alert('Check Account And PassWord, Please !');
        }
    }

    componentWillMount(){
        this.onGenerateData();
    }

    onOpenForm = () => {
        if(this.props.TaskEditing && this.props.TaskEditing.id !== ''){
            this.props.OpenForm();
            this.props.updateTask({
                id: '',
                mssv: '',
                tensv: '',
                diemNMLT: '',
                diemLTHDT: '',
                diemCTDL: '',
                status: true,
            })
        }else{
            this.props.onOpenForm();
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

    onExitForm = () => {
        this.setState({
            openForm: false,
            
        })
    }

    onSearchFilter = (filterName, filterStatus) => {
        this.setState({
            filterName: filterName,
            filterStatus: filterStatus,
        })
    }

    render(){
        var { tasks, filterName, filterStatus, searchName } = this.state;
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

        var element = this.props.isDisplayForm === true ? <Tasks onSubmit={ this.onSubmit }  onExitForm={ this.onExitForm }/> : '';
        return (
            <div>
                <Header onSubmit={this.onSubmitLogin}/>
                <div className="container">
                    <div className="row">
                        <div className={ this.props.isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                            { element }
                        </div>
                        <div className={ this.props.isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <button type="button" className="btn btn-primary" onClick={ this.onOpenForm }>
                                <span className="fa fa-plus mr-5"></span>&nbsp;Thêm Sinh Viên
                            </button>&ensp;
            
                            <Control/>
                            <div className="row mt-15">
                                <TaskList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        TaskEditing : state.TaskEditing,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onOpenForm : () => {
            dispatch(actions.isDisplayForm());
        },
        updateTask : (task) => {
            dispatch(actions.updateTask(task));
        },
        OpenForm : () => {
            dispatch(actions.openForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
