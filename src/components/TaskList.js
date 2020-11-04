import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux'; // dùng để kết nối trong redux
import * as actions from './../actions/index';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchName: '',
            searchStatus: null,
        }
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            searchName: name === 'searchName' ? value : this.state.searchName, 
            searchStatus: name === 'searchStatus' ? value : this.state.searchStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value,
        });
    }

    render(){
        var {tasks, filterTable, sort, searchName} = this.props;
        var sortName = sort.sortName;
        var sortValue = sort.sortValue;
        // Lọc table theo tên.
        //Khi không bấm vào filter lọc thì nó sẽ không tồn tại filterTable.searchName và filterTable.status
        if(filterTable.searchName){
            tasks = tasks.filter((item, index) => {
                return item.tensv.toLowerCase().indexOf(filterTable.searchName.toLowerCase()) !== -1;
            })
        }

        // Lọc table theo status
        if(filterTable.searchStatus){
            var status = filterTable.searchStatus === '1' ? true : filterTable.searchStatus === '0' ? false : -1;
            if(status !== -1){
                tasks = tasks.filter((item, index) => {
                    return item.status === status;
                })
            }
        } 

        // Sort theo họ tên từ bé đến lớn (a - b)
        if(sortName === 'name' && sortValue === 1){
            tasks.sort((a, b) => {
                if(a.tensv < b.tensv){ 
                    return -1;
                }else if(a.tensv > b.tensv){ 
                    return 1;
                }else{
                    return 0; 
                }
            });
        }

        // Sort theo họ tên từ lớn đến bé (b - a)
        if(sortName === 'name' && sortValue === -1){
            tasks.sort((a, b) => {
                if(a.tensv < b.tensv){ 
                    return 1;
                }else if(a.tensv > b.tensv){ 
                    return -1;
                }else{
                    return 0; 
                }
            });
        }

        // Sort theo status từ lớn đến bé (b-a)
        if(sortName === 'status' && sortValue === 1){
            tasks.sort((a, b) => {
                if(a.status < b.status){ 
                    return 1;
                }else if(a.status > b.status){ 
                    return -1;
                }else{
                    return 0; 
                }
            });
        }
      
        // Sort theo status từ bé đến lớn (a-b)
        if(sortName === 'status' && sortValue === -1){
            tasks.sort((a, b) => {
                if(a.status < b.status){ 
                    return -1;
                }else if(a.status > b.status){  
                    return 1;
                }else{
                    return 0; 
                }
            });
        }

        // Sort theo điểm từ thấp đến cao (a-b)
        if(sortName === 'diem' && sortValue === 1){
            tasks.sort((a,b) => {
                if((a.diemNMLT + a.diemLTHDT + a.diemCTDL) < (b.diemNMLT + b.diemLTHDT + b.diemCTDL)){
                    return -1;
                }else if((a.diemNMLT + a.diemLTHDT + a.diemCTDL) > (b.diemNMLT + b.diemLTHDT + b.diemCTDL)){
                    return 1;
                }else{
                    return 0;
                }
            })
        }

        //Sort theo điểm từ cao đến thấp (b-a)
        if(sortName === 'diem' && sortValue === -1){
            tasks.sort((a,b) => {
                if((a.diemNMLT + a.diemLTHDT + a.diemCTDL) < (b.diemNMLT + b.diemLTHDT + b.diemCTDL)){
                    return 1;
                }else if((a.diemNMLT + a.diemLTHDT + a.diemCTDL) > (b.diemNMLT + b.diemLTHDT + b.diemCTDL)){
                    return -1;
                }else{
                    return 0;
                }
            })
        }

        if(searchName){
            tasks = tasks.filter((item, index) => {
                return item.tensv.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
            })
        }

        var elements = tasks.map((item, index) => {
            return <TaskItem key={ item.id } item={ item } index={ index + 1 } />
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
                                <input type="text" className="form-control" name="searchName" placeholder="Tìm kiếm..." onChange={this.onHandleChange} />
                            </td>
                            <td></td>
                            <td>
                                <select type="checkbox" className="form-control" name="searchStatus" onChange={this.onHandleChange}>
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

const mapStateToProps = (state) => { // state chính là của thằng store trong reducers/index
    return {
        tasks: state.tasks,
        filterTable : state.filterTable,
        searchName : state.searchName.searchName,
        sort : state.sort,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTable(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
