import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HubConnectionBuilder } from '@microsoft/signalr';


import { connectToHub, getMsg } from '../../redux/actions';
import { getCookies } from '../../utils/index';

import '../personal/personal.scss';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
import '../personal/personal.scss';

class Chat extends Component {

    state = {
        name: "",
        msg: "",
        msgs: [
            {
                memberid: 0,
                text: "",
                gender: "",
                username: "",
            }
        ],
        //HubConnection: null,
    }


    //自定義的資料存放
    initData= {}

    initPassData = () => {
        const path = this.props.location.pathname;
        const pathAr = path.split("/");
        const names = pathAr[2].split("+");
        const userid =getCookies();
        return {
            memberid: userid,
            recieveid: names[1],
        }
    }

    //發送訊息
    sendMsg = () => {
        //取得userid 跟 recieveid
        const path = this.props.location.pathname;
        const pathAr = path.split("/");
        const names = pathAr[2].split("+");

        //激發 chathub 裡面的方法名
        this.props.hubConnection
            .invoke("SendBothMsg", names[0], names[1], this.state.msg)
            .catch(err => console.log(err));

        this.setState({ msg: "" });



    }

    //進入聊天室
    IntoChat = () => {

        const path = this.props.location.pathname;
        const pathAr = path.split("/");
        const names = pathAr[2].split("+");
        console.log("聊天名", names);
        //把自己的memberid 根聊天對象的id 傳到後端，用來存放connectionid
        this.state.HubConnection.invoke("AddConnectList", names[0], names[1])
            .catch(err => console.log(err));
    }

    async componentDidMount() {
        //創建一個實例
        // const HubConnection = new HubConnectionBuilder()
        //     .withUrl(`${process.env.REACT_APP_URL}/chathub`).withAutomaticReconnect().build();

        // const name = "hank";
        //連線
        // this.setState({ name, HubConnection }, () => {

        //     this.state.HubConnection.start()
        //         .then(() => console.log("連線成功"))
        //         .then(() => this.IntoChat())
        //         .catch(err => console.log("連線失敗", err));
        //     //監聽 chathub 裡面的await Clients.All.SendAsync("RecieveMsg", content);
        //     // 下面(content) 是結果，要跟chathub定義的參數數量一樣
        //     this.state.HubConnection.on("SendBothMsg", (user, reciever, input) => {


        //         //判斷是哪個用戶說的
        //         const memberid = user.memberid;
        //         const text = input;

        //         //如果第一次傳訊息就覆蓋過去
        //         const firstmsg =this.state.msgs
        //         // if(firstmsg[0].memberid===0){
        //         //     this.setState({ msgs:[{...user,text}] });
        //         // }

        //         //把講過的話組合成陣列
        //         const msgs = this.state.msgs.concat([{...user,text}]);
        //         //刷新讓他渲染
        //         this.setState({ msgs });
        //     })
        //     //測試
        //     // this.state.HubConnection.on("IntoChat", (content) => {
        //     //     const text = content;
        //     //     //把講過的話組合成陣列
        //     //     const msgs = this.state.msgs.concat([text]);
        //     //     //刷新讓他渲染
        //     //     this.setState({ msgs });
        //     // })



        // });
        // const path = this.props.location.pathname;
        // const pathAr = path.split("/");
        // const names = pathAr[2].split("+");
        // if(!this.props.HubConnection){
        //     await this.props.connectToHub(names[0])
        // }
        const data =this.initPassData();
        this.initData = {...data};
        console.log("自訂議",this.initData)
        const {memberid,recieveid} =this.initData;
        // const path = this.props.location.pathname;
        // const pathAr = path.split("/");
        // const names = pathAr[2].split("+");

        //如果還沒有撈資料過
        if (this.state.msgs[0].memberid === 0 || this.state.msg.length<1) {
            await this.props.getMsg({ memberid, recieveid })
            const msgs = this.props.msgs;
            this.setState({ msgs });
        }

        console.log("有這個實體嗎", this.props);

        this.props.hubConnection.on("SendBothMsg", (user, reciever, input) => {

            console.log("有接收到嗎",user,input);
            //判斷是哪個用戶說的
            const memberid = user.memberid;
            const text = input;

            //如果第一次傳訊息就覆蓋過去
            // const firstmsg = this.state.msgs
            // if (firstmsg[0].memberid === 0) {
            //     this.setState({ msgs: [] });
            // }

            //把講過的話組合成陣列
            const msgs = this.state.msgs.concat([{ ...user, text }]);
            //刷新讓他渲染
            this.setState({ msgs });
        })

    }

    //組件銷毀時要做的事 (生命週期)
    componentWillUnmount() {
        const initmsg = {
            memberid: 0,
            text: "",
            gender: "",
            username: "",
        }
        //讓state 回到一開始的狀態，下次進入會再去後台撈msg資料
        this.setState({ msgs: [initmsg] })
    }

    render() {

        //擷取用戶名
        const path = this.props.location.pathname;
        const pathAr = path.split("/");
        const names = pathAr[2].split("+");

        const msgs = this.state.msgs.filter(i => i.memberid !== 0);
        console.log("輸入的訊息",this.state.msg);
        console.log("現在的訊息狀態", msgs)
        //console.log("用戶號", names)
        //console.log("型別", typeof (names[0]))
        return (
            <div className="mybody" >
                <div className="outborder topborder" >
                    <div className="container mt-3 mcbd">
                        <div className="row justify-content-center">
                            <div className="card col-7 my-2 chatbox">
                                <div className="mt-2">

                                    <div className="headerdp">

                                        <div className="">
                                            <img className="mx-3 headphoto" src={woman} style={{ "width": 50 }} alt="" />
                                            <div className="headerdp chnsz" style={{ "verticalAlign": "top" }}>台北張阿姨</div>

                                        </div>


                                        <div className=" ctmsg ctmsgsf px-2">寶貝今晚來陪我啊 </div>


                                    </div>

                                </div>
                            </div>


                            <div className="card col-7 my-2 chatbox">
                                <div className="mt-2">

                                    <div className="headerdp">

                                        <div className="">
                                            <img className="mx-3 headphoto  float-right" src={man} style={{ "width": 50 }} alt="" />

                                        </div>


                                        <div className=" float-right mt-5 ctmsg px-2" >閉嘴低能兒 </div>


                                    </div>

                                </div>
                            </div>


                            {
                                msgs.map((m, index) => (
                                    m.memberid === parseInt(names[0]) ?
                                        <div className="card col-7 my-2 chatbox" key={index}>
                                            <div className="mt-2">

                                                <div className="headerdp">

                                                    <div className="">
                                                        <img className="mx-3 headphoto  float-right" src={m.gender === "男" ? man : woman} style={{ "width": 50 }} alt="" />

                                                    </div>


                                                    <div className=" float-right mt-5 ctmsg px-2" >{m.text} </div>


                                                </div>

                                            </div>
                                        </div>
                                        :
                                        <div className="card col-7 my-2 chatbox" key={index}>
                                            <div className="mt-2">

                                                <div className="headerdp">

                                                    <div className="">
                                                        <img className="mx-3 headphoto" src={m.gender === "男" ? man : woman} style={{ "width": 50 }} alt="" />
                                                        <div className="headerdp chnsz" style={{ "verticalAlign": "top" }}>{m.username}</div>

                                                    </div>


                                                    <div className=" ctmsg ctmsgsf px-2">{m.text} </div>


                                                </div>

                                            </div>
                                        </div>
                                ))
                            }


                        </div>
                    </div>

                    <nav className="nav fixed-bottom mb-3" role="navigation">
                        <div className="container justify-content-center">
                            <div className="row justify-content-center">

                                <input className="ipsz" type="text" onChange={e => this.setState({ msg: e.target.value })} />
                                <button className="btn btn-secondary" onClick={this.sendMsg}>送出</button>




                            </div>

                        </div>

                    </nav>



                </div>

            </div>
        );
    }
}

export default connect(
    state => ({ hubConnection: state.hubConnection, msgs: state.msgs }),
    { connectToHub, getMsg }
)(Chat);