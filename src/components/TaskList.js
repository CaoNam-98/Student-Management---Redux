import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    render(){
        var {tasks} = this.props;
        var elements = tasks.map((item, index) => {
            return <TaskItem key={ item.id } item={ item } index={ index + 1 } onDelete={ this.props.onDelete }/>
        })

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover mg-10">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">MSSV</th>
                            <th className="text-center">Tên Sinh Viên</th>
                            <th className="text-center">Điểm TB</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <input type="text" className="form-control" placeholder="Tìm kiếm..."/>
                            </td>
                            <td></td>
                            <td>
                                <select className="form-control">
                                    <option value="-1">Tất Cả</option>
                                    <option value="0">Ẩn</option>
                                    <option value="1">Kích Hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        { elements }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;
