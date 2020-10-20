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
        };
        this.onOpenForm = this.onOpenForm.bind(this);
    }

    onOpenForm(){
        this.setState({
            openForm: !this.state.openForm,
        })
    }

    onSubmit = (data) => {
        var {tasks} = this.state;
        data.id = randomstring.generate(7);
        data.diemNMLT = parseInt(data.diemNMLT, 10);
        data.diemLTHDT = parseInt(data.diemLTHDT, 10);
        data.diemCTDL = parseInt(data.diemCTDL, 10);
        data.status = data.status === 'true' ? true : false;
        tasks.push(data);
        this.setState({
            tasks: tasks,
        })
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

    render(){
        console.log(this.state.tasks);
        var element = this.state.openForm === true ? <Tasks onSubmit={ this.onSubmit }/> : '';
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
                            </button>
                            <Control />
                            <div className="row mt-15">
                                <TaskList tasks={ this.state.tasks } onDelete={ this.onDelete }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
