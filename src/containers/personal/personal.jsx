import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCookies } from '../../utils/index';
import { getPersonal, getSelectOption,logout } from '../../redux/actions';

import './personal.scss';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
import { string } from 'prop-types';
class Personal extends Component {

    state = {
        job: "",
        username: "",
        nickname: "",
        state: "",
        preferType: [],
        interest: [],
        introduce: "",
        getdata:false,
        getOption: false,
    }

    //暫時用不到的上船大頭貼
    uploadPhoto = (e) => {
        console.log(e.target.value);
        console.log(this.refs.file.files);
    }

    //這邊好像怪怪的 這邊用 promise 在跑完ajax 後 才從user取值
    async componentDidMount() {
        const memberid =getCookies();
        if(!this.state.getdata){
            await this.props.getPersonal({memberid});
            //這個的權重好像會比 ajax前面
            //應該是說他是開另外一個線去跑ajax
            const { username,nickname,job, state, introduce } = this.props.user;
            //console.log("個人訊息P",this.props.user);
            this.setState({ username,nickname,job, state, introduce ,getdata:true});
        }

        if(!this.state.getOption){
            this.props.getSelectOption();
            this.setState({getOption:true});
        }
        
    }

    //蒐集數據
    handleInput = (name, event) => {
        const val = event.target.value;
        //取到要儲存的陣列
        let checkarr = this.state[name]; //取道屬性的值
        //console.log("string屬性",typeof (String)); //fuction 有夠低能
        console.log("這是什麼",{[name]:val});

        if (typeof (checkarr) !== "string") {
            if(!checkarr.find(i =>i===val)){
                checkarr.push(val);
            }
            
            console.log("是陣列嗎",checkarr);
            this.setState({ [name]: checkarr });
            return;
        }
        this.setState({ [name]: val });
    }

    //儲存資料
    updateUser = ()=>{
        console.log("儲存資料");
    }

    //登出
    logout = ()=>{
        this.props.logout();
        this.props.history.replace('/login');
        console.log("登出");
    }


    render() {
        const {username,nickname,state,introduce} = this.state;
        const { selectOption, user } = this.props;

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">

                            <img className="mx-3 headphoto" src={woman} style={{ "width": 100 }} alt="" />


                            <div className="col-xs align-self-center">
                                <h5>{user.username}</h5>
                            </div>

                        </div>
                    </div>
                    <p></p>
                    <div className="container mt-10">
                        <div className="row justify-content-center ">

                            <form className="col-6 col-md-4">
                                <aside>姓名</aside>
                                <input className="form-control my-1" type="text" placeholder="請輸入姓名" onChange={e => { this.handleInput("nickname", e) }} value={nickname}/>
                                <p></p>


                                <aside>狀態</aside>
                                <input className="form-control my-1" type="text" placeholder="狀態" onChange={e => { this.handleInput("state", e) }} value={state}/>
                                <p></p>
                                <aside>興趣
                                    <select className="my-1 ml-2" name="" id=""  onChange={e => { this.handleInput("interest", e) }}>
                                        <option disabled value="">請選擇</option>
                                        {selectOption.interests.map( (item,index)=><option value={item} key={index}>{item}</option> )}
                                    </select>
                                </aside>
                                <input className="form-control my-1" type="text" placeholder="興趣" />

                                <p></p>

                                <aside>偏好類型
                                    <select className="my-1 ml-2" name="" id="" onChange={e => { this.handleInput("interest", e) }}>
                                        <option disabled value="">請選擇</option>
                                        {selectOption.preferTypes.map( (item,index)=><option value={item} key={index}>{item}</option> )}
                                    </select>
                                </aside>
                                <input className="form-control my-1" type="text" placeholder="偏好類型" />

                                <p></p>
                                <aside>個人簡介</aside>
                                <textarea className="form-control my-1" name="" id="" cols="25" rows="3" onChange={e => { this.handleInput("introduce", e) }} value={introduce}/>
                                <p></p>
                                <div className="col">
                                    <button className="btn btn-primary my-1 mb-5" onClick={this.updateUser}>保存</button>
                                    <button className="btn btn-outline-success my-1 mb-5 float-right" onClick={this.logout}>退出登入</button>

                                </div>


                            </form>


                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user, selectOption: state.selectOption }),
    { getPersonal, getSelectOption,logout }
)(Personal);