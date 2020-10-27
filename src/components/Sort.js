import React, { Component } from 'react';

class Sort extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortName: null,
            sortValue: null,
        } 
    }

    onClick = (name, value) => {
        this.props.onSort(name, value);
        this.setState({
            sortName: name,
            sortValue: value,
        })
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle mg-10" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp &nbsp;<span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}>
                            <a role="button" href="/#">
                                        <span className="fa fa-sort-alpha-asc pr-5">
                                            Tên A-Z &ensp;
                                            <i className={this.state.sortName ==='name' && this.state.sortValue === 1 ? "fas fa-check" : ''}></i>
                                        </span>
                                    </a>
                        </li>
                        <li onClick={() => this.onClick('name', -1)}>
                            <a role="button" href="/#">
                                        <span className="fa fa-sort-alpha-desc pr-5">
                                            Tên Z-A &ensp;
                                            <i className={this.state.sortName ==='name' && this.state.sortValue === -1 ? "fas fa-check" : ''}></i>
                                        </span>
                                    </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={() => this.onClick('status', 1)}><a role="button" href="/#">Trạng Thái Kích Hoạt &ensp;
                                            <i className={this.state.sortName ==='status' && this.state.sortValue === 1 ? "fas fa-check" : ''}></i></a></li>
                        <li onClick={() => this.onClick('status', -1)}><a role="button" href="/#">Trạng Thái Ẩn &ensp;
                                            <i className={this.state.sortName ==='status' && this.state.sortValue === -1 ? "fas fa-check" : ''}></i></a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
