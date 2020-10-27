import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
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

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/#">QUẢN LÝ SINH VIÊN</a>
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="/#">Trang Chủ</a>
                        </li>
                        <li>
                            <a href="/#">Sinh Viên</a>
                        </li>
                    </ul>

                    <form className="navbar-form navbar-right">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="UserName" name="username" onChange={ this.onHandleChange }/> &nbsp;
                            <input type="password" className="form-control" placeholder="PassWord" name="password" onChange={ this.onHandleChange }/>
                        </div> &ensp;
                        <button type="submit" className="btn btn-danger" onClick={this.onSubmit}>Sign in</button>
                    </form>
                </div>
            </nav>         
        );
    }
}

export default Header;
