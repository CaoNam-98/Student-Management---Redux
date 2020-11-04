import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchName: '',
        };
    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSearchName = () => {
        this.props.onSearchName(this.state);
    }

    render(){
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group mg-10">
                    <input type="text" className="form-control" name="searchName" placeholder="Nhập từ khóa..." onChange={this.onHandleChange} />
                    <span className="input-group-btn">
                                <button className="btn btn-primary" type="button" onClick={this.onSearchName}>
                                    <span className="fa fa-search mr-5"></span>&nbsp;Tìm
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearchName : (searchName) => {
            dispatch(actions.searchName(searchName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
