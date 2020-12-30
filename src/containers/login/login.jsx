import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';


import { login } from '../../redux/actions';
import Logo from '../../components/logo/logo'
//登入路由
class Login extends Component {

    state={
        username:'',
        password:'',

    };
 

    //監聽輸入的值
    handleInput = (name,event)=>{
        const val =event.target.value;
        console.log(name, val);
        this.setState({
            [name]:val //es6 特有語法 (屬性值)取到的name 是字串不能直接放進{}
        });
    };
    //註冊
    login = ()=>{
        this.props.login(this.state);
    };

    //跳轉到登入頁面
    redirectRegis=()=>{
        this.props.history.replace('/register');
    };



    render() {
        
        //讀取redux管理的訊息
        const {msg,redirectTo} =this.props.user;
        //如果有值就跳轉
        console.log("跳轉路徑",redirectTo);
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
                            <input type="text" className="form-control" id="userInput" placeholder="使用者帳號" onChange={(e)=>{this.handleInput("username",e)}}/>
                        </div>

                        <div className="form-group">                      
                            <input type="text" className="form-control" id="passwordInput" placeholder="密碼" onChange={(e)=>{this.handleInput("password",e)}}/>
                        </div>

                        <div className="justify-content-center text-center text-danger">
                            {msg?<span >{msg}</span>:null}
                        </div>
                        
                        <div className="form-group">
                            
                            <button className="btn btn-secondary btn-block" onClick={this.login}>登入</button>
                                                   
                            <button className="btn btn-outline-info btn-block" onClick={this.redirectRegis}>還沒有帳號?  前往註冊</button>
                        </div>

                        

                    </form>

                    </div>
                    
                </div>

            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login);
