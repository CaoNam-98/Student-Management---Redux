import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
    onDelete = () => {
        this.props.deleteTask(this.props.item.id);
        this.props.closeForm();
    }

    onUpdate = () => {
        this.props.openForm();
        this.props.updateTask(this.props.item);
    }

    onUpdateStatus = () => {
        this.props.updateStatus(this.props.item.id);
    }

    render(){  
        return (
            <tr className="text-center">
                <td>{ this.props.index }</td>
                <td>{ this.props.item.mssv }</td>
                <td>{ this.props.item.tensv }</td>
                <td>{ ((this.props.item.diemNMLT + this.props.item.diemCTDL + this.props.item.diemLTHDT)/ 3).toFixed(2) }</td>
                <td className="text-center">
                    <span className={ this.props.item.status === true ? "label label-danger" : "label label-success" } onClick={ this.onUpdateStatus }>
                                { this.props.item.status === true ? 'Kích Hoạt' : 'Ẩn'}
                            </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onUpdate }>
                        <span className="fa fa-pencil mr-5"></span>&ensp;Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ this.onDelete }>
                        <span className="fa fa-trash mr-5"></span>&ensp;Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        deleteTask : (id) => {
            dispatch(actions.deleteTask(id));
        },
        closeForm : () => {
            dispatch(actions.closeForm());
        },
        openForm : () => {
            dispatch(actions.openForm());
        },
        updateTask : (task) => {
            dispatch(actions.updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
// sau khi thay đổi state thì component mà được gọi đến thì sẽ chạy cả 2 hàm (mapStateToProps, mapDispatchToProps)