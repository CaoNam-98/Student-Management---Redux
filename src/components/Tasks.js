import React, { Component } from 'react';

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
            status: 'true',
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
        this.props.onSubmit(this.state);
        this.onCancelForm();
    }

    onCancelForm = () => {
        this.setState({
            id: '',
            mssv: '',
            tensv: '',
            diemNMLT: '',
            diemLTHDT: '',
            diemCTDL: '',
            status: 'true',
        });
    }

    componentWillMount(){
        var {onTaskEditing} = this.props;
        if(onTaskEditing && onTaskEditing.id !== null){
            this.setState({
                id: onTaskEditing.id,
                mssv: onTaskEditing.mssv,
                tensv: onTaskEditing.tensv,
                diemNMLT: onTaskEditing.diemNMLT,
                diemLTHDT: onTaskEditing.diemLTHDT,
                diemCTDL: onTaskEditing.diemCTDL,
                status: onTaskEditing.status === true ? 'true' : 'false',
            });
        }else{
            this.onCancelForm();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.onTaskEditing !== null){
            this.setState({
                id: nextProps.onTaskEditing.id,
                mssv: nextProps.onTaskEditing.mssv,
                tensv: nextProps.onTaskEditing.tensv,
                diemNMLT: nextProps.onTaskEditing.diemNMLT,
                diemLTHDT: nextProps.onTaskEditing.diemLTHDT,
                diemCTDL: nextProps.onTaskEditing.diemCTDL,
                status: nextProps.onTaskEditing.status === true ? 'true' : 'false',
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
                    <h3 className="panel-title">{this.props.onTaskEditing !== null ? 'Chỉnh Sửa Sinh Viên' : 'Thêm Sinh Viên'}
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

export default Tasks;
