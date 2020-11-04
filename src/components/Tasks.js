import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

// Khi render lại thì state nhận giá trị lúc khởi tạo
class Tasks extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            mssv: '',
            tensv: '',
            diemNMLT: '',
            diemLTHDT: '',
            diemCTDL: '',
            status: true,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onCancelForm();
        this.onExitForm();
    }

    onCancelForm = () => {
        this.setState({
            id: '',
            mssv: '',
            tensv: '',
            diemNMLT: '',
            diemLTHDT: '',
            diemCTDL: '',
            status: true,
        });
    }

    componentWillMount(){
        var {TaskEditing} = this.props;
        if(TaskEditing && TaskEditing.id !== null){
            this.setState({
                id: TaskEditing.id,
                mssv: TaskEditing.mssv,
                tensv: TaskEditing.tensv,
                diemNMLT: TaskEditing.diemNMLT,
                diemLTHDT: TaskEditing.diemLTHDT,
                diemCTDL: TaskEditing.diemCTDL,
                status: TaskEditing.status === true ? 'true' : 'false',
            });
        }else{
            this.onCancelForm();
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps && nextProps.TaskEditing !== null){
            this.setState({
                id: nextProps.TaskEditing.id,
                mssv: nextProps.TaskEditing.mssv,
                tensv: nextProps.TaskEditing.tensv,
                diemNMLT: nextProps.TaskEditing.diemNMLT,
                diemLTHDT: nextProps.TaskEditing.diemLTHDT,
                diemCTDL: nextProps.TaskEditing.diemCTDL,
                status: nextProps.TaskEditing.status,
            })
        }else{
            this.onCancelForm();
        }
    }

    onExitForm = () => {
        this.props.onExitForm();
    }

    render(){
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.TaskEditing.id !== '' ? 'Chỉnh Sửa Sinh Viên' : 'Thêm Sinh Viên'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmitForm }>
                        <div className="form-group">
                            <label htmlFor="mssv">Mã Sinh Viên :</label>
                            <input type="text" className="form-control" id="mssv" name="mssv" value={ this.state.mssv } onChange={ this.onHandleChange }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tên Sinh Viên :</label>
                            <input type="text" className="form-control" id="name" name="tensv" value={ this.state.tensv } onChange={ this.onHandleChange }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nmlt">Điểm Nhập Môn Lập Trình :</label>
                            <input type="number" className="form-control" id="nmlt" name="diemNMLT" value={ this.state.diemNMLT }onChange={ this.onHandleChange }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lthdt">Điểm Lập Trình Hướng Đối Tượng :</label>
                            <input type="number" className="form-control" id="lthdt" name="diemLTHDT" value={ this.state.diemLTHDT } onChange={ this.onHandleChange }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ctdl">Điểm Cấu Trúc Dữ Liệu Và Giải Thuật :</label>
                            <input type="number" className="form-control" id="ctdl" name="diemCTDL" value={ this.state.diemCTDL } onChange={ this.onHandleChange }/>
                        </div>
                        <label htmlFor="status">Trạng Thái :</label>
                        <select className="form-control" required="required" id="status" name="status" value={ this.state.status } onChange={ this.onHandleChange }>
                            <option value={ true }>Kích Hoạt</option>
                            <option value={ false }>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"><i className="fas fa-plus">&nbsp;</i>Lưu Lại</button>&ensp;
                            <button type="button" className="btn btn-danger" onClick={ this.onCancelForm }><i className="fas fa-times">&nbsp;</i>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        TaskEditing: state.TaskEditing,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => { // 
            dispatch(actions.addTask(task)); // actions.addTask(task) lam action cho reducers/tasks
        },
        onExitForm : () => {
            dispatch(actions.closeForm());
        },
        updateTask : (task) => {
            dispatch(actions.updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
