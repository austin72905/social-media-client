import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Logo from '../../components/logo/logo';
import { register } from '../../redux/actions';

//註冊路由
class Register extends Component {

    state = {
        username: '',
        password: '',
        confirm: '',
        gender: '',
    };

    //監聽選擇的性別
    // handleSelecct = (event)=>{
    //     const selectVal =event.target.value;
    //     this.setState({gender:selectVal});      
    // };

    //監聽輸入的值
    handleInput = (name, event) => {
        const val = event.target.value;
        //console.log(name, val);
        this.setState({
            [name]: val //es6 特有語法 (屬性值)取到的name 是字串不能直接放進{}
        });
    };
    //註冊
    register = () => {
        this.props.register(this.state);
    };

    //跳轉到登入頁面
    redirectLogin = () => {
        this.props.history.replace('/login');
    };

    render() {
        const { gender } = this.state;

        //讀取redux管理的訊息
        const {msg,redirectTo} =this.props.user;
        //如果有值就跳轉
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" >
                        <span className="h4 mx-3 ">React Social Media App</span>
                    </a>
                </nav>
                <p></p>
                <Logo></Logo>

                <div className="container mt-3">
                    <div className="row justify-content-center">

                        <form className="col-md-6">

                            <div className="form-group">
                                <input type="text" className="form-control" id="userInput" placeholder="使用者帳號" onChange={(e) => { this.handleInput("username", e) }} />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" id="passwordInput" placeholder="密碼" onChange={(e) => { this.handleInput("password", e) }} />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" id="confirmInput" placeholder="確認密碼" onChange={(e) => { this.handleInput("confirm", e) }} />
                            </div>

                            <div className="row justify-content-center align-items-center">

                                <div className="form-group">

                                    <label className="mx-2" htmlFor="option1">男</label>
                                    <input className="mx-2" type="radio" name="option1" id="option1" value="男" onChange={(e) => { this.handleInput("gender", e) }} checked={gender === "男"} />

                                    <label className="mx-2" htmlFor="option2">女</label>
                                    <input className="mx-2" type="radio" name="option2" id="option2" value="女" onChange={(e) => { this.handleInput("gender", e) }} checked={gender === "女"} />

                                </div>
                            </div>

                            <div className="justify-content-center text-center text-danger">
                                {msg?<span >{msg}</span>:null}
                            </div>

                            
                            
                            <div className="form-group">

                                <button className="btn btn-secondary btn-block" onClick={this.register}>註冊</button>

                                <button className="btn btn-outline-info btn-block" onClick={this.redirectLogin}>已有帳戶</button>
                            </div>

                            



                        </form>

                    </div>

                </div>

            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),  //從combineReducers管理的user取到值
    { register }
)(Register);
//export default Register;