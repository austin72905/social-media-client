import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCookies } from '../../utils/index';
import { getPersonal, getSelectOption, logout, updateUser } from '../../redux/actions';

import './personal.scss';
import '../../scss/main.scss';
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
        getdata: false,
        getOption: false,
    }

    //暫時用不到的上船大頭貼
    uploadPhoto = (e) => {
        console.log(e.target.value);
        console.log(this.refs.file.files);
    }

    //這邊好像怪怪的 這邊用 promise 在跑完ajax 後 才從user取值
    async componentDidMount() {
        const memberid = getCookies();
        if (!this.state.getdata) {
            await this.props.getPersonal({ memberid });
            //這個的權重好像會比 ajax前面
            //應該是說他是開另外一個線去跑ajax
            const { username, nickname, job, state, introduce,preferType,interest } = this.props.user;
            //console.log("個人訊息P",this.props.user);
            const preferArr=preferType.split("、");
            const interArr =interest.split("、");
            this.setState({ username, nickname, job, state, introduce,preferType:preferArr,interest:interArr ,getdata: true });
        }

        if (!this.state.getOption) {
            this.props.getSelectOption();
            this.setState({ getOption: true });
        }

    }

    //輸出 select 選項的內容
    handleOption =(name)=>{
        //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors
        const optionArr = this.state[name]; //取得屬性的值
        let result="";
        // if(name==="preferType"){
        //     result=preferType.join(" ");
        // }

        // if(name==="interest"){
        //     result=interest.join(" ");
        // }
        result=optionArr.join(" ");
        return result;
    }

    //蒐集數據
    handleInput = (name, event) => {
        const val = event.target.value;
        let checkarr = this.state[name]; //取道屬性的"值"
        console.log("checkarr是什麼", checkarr);
        //取到要儲存的陣列
        // if (name === "preferType") {
        //     if (!preferType.find(i => i === val)) {
        //         preferType.push(val);
        //     }

        //     console.log("是陣列嗎", preferType);
        //     this.setState({ [name]: preferType });
        //     return;
        // }

        // if (name === "interest") {
        //     if (!interest.find(i => i === val)) {
        //         interest.push(val);
        //     }

        //     console.log("是陣列嗎", interest);
        //     this.setState({ [name]: interest });
        //     return;
        // }
        
        //console.log("string屬性",typeof (String)); //fuction 有夠低能

        console.log("checkarr屬性",typeof (checkarr));
        
        console.log("name是什麼", name);
        console.log("這是什麼", { [name]: val });

        //js 型別檢測有bug， type of null => obj 
        //https://cythilya.github.io/2018/10/11/types/
        //
        if (typeof (checkarr) !== "string" && checkarr !== null) {
            if (!checkarr.find(i => i === val)) {
                checkarr.push(val);
            }

            console.log("是陣列嗎", checkarr);
            this.setState({ [name]: checkarr });
            return;
        }
        this.setState({ [name]: val });
    }

    //儲存資料
    updateUser = () => {
        console.log("儲存資料");
        const memberid = getCookies();
        this.props.updateUser(memberid,this.state);
    }

    //登出
    logout = () => {
        this.props.logout();
        this.props.history.replace('/login');
        console.log("登出");
    }


    render() {
        const { username, nickname,job, state, introduce } = this.state;
        const { selectOption, user } = this.props;
        //console.log(this.state);

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">

                            <img className="mx-3 headphoto" src={user.gender === "男" ? man : woman} style={{ "width": 100 }} alt="" />


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
                                <input className="form-control my-1" type="text" placeholder="請輸入姓名" onChange={e => { this.handleInput("nickname", e) }} value={nickname} />
                                <p></p>

                                <aside>工作</aside>
                                <input className="form-control my-1" type="text" placeholder="請輸入職業" onChange={e => { this.handleInput("job", e) }} value={job} />
                                <p></p>


                                <aside>狀態</aside>
                                <input className="form-control my-1" type="text" placeholder="狀態" onChange={e => { this.handleInput("state", e) }} value={state} />
                                <p></p>
                                <aside>興趣
                                    <select className="my-1 ml-2" name="" id="" onChange={e => { this.handleInput("interest", e) }} value={this.state.interest}>
                                        <option disabled value="">請選擇</option>
                                        {selectOption.interests.map((item, index) => <option value={item} key={index}>{item}</option>)}
                                    </select>
                                </aside>
                                <input className="form-control my-1" type="text" placeholder="興趣" disabled value={this.handleOption("interest")}/>

                                <p></p>

                                <aside>偏好類型
                                    <select className="my-1 ml-2" name="" id="" onChange={e => { this.handleInput("preferType", e) }} value={this.state.preferType}>
                                        <option disabled value="">請選擇</option>
                                        {selectOption.preferTypes.map((item, index) => <option value={item} key={index}>{item}</option>)}
                                    </select>
                                </aside>
                                <input className="form-control my-1" type="text" placeholder="偏好類型" disabled value={this.handleOption("preferType")}/>

                                <p></p>
                                <aside>個人簡介</aside>
                                <textarea className="form-control my-1" name="" id="" cols="25" rows="3" onChange={e => { this.handleInput("introduce", e) }} value={introduce} />
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
    { getPersonal, getSelectOption, logout, updateUser }
)(Personal);