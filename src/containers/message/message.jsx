import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCookies } from '../../utils/index';
import { getMsgList } from '../../redux/actions';

import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
import '../personal/personal.scss';

class Message extends Component {

    state = {
        msgList: [],
        unread: 0,
    }

    goToChat = (userid = 1) => {
        const myid = getCookies();
        this.props.history.push(`/chat/${myid}+${userid}`)
    }

    async componentDidMount() {
        const memberid = getCookies();
        await this.props.getMsgList({ memberid });
        const { msgList } = this.props;
        this.setState({ msgList });
        this.props.hubConnection.on("SendLastMsg", (msg) => {
            console.log("接收訊息", msg);
            //如果傳進來的msg 的 chatid 已經存在就覆蓋，不存在就新增
            let msgList = this.state.msgList;
            const msgexisted = msgList.find(i => i.chatid === msg.chatid);
            //計算未讀訊息量
            let lastUnreadCount =0;
            console.log("訊息存在否", msgexisted);
            if (msgexisted) {
                msgList = msgList.filter(i => i.chatid !== msg.chatid);
                lastUnreadCount=msgexisted.unreadcount;
            }
            //統計到最新的未讀數量
            msg.unreadcount +=lastUnreadCount;
            console.log("訊息列", msgList);
            msgList.push(msg);


            this.setState({ msgList });
        })
    }

    render() {

        const { msgList } = this.state;

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">


                            {/*註解..當js寫*/}
                            {msgList.map((msg, index) => (
                                <div className="card col-7 my-2" onClick={() => this.goToChat(msg.chatid)} key={index}>
                                    <div className="mt-2">

                                        <div className="headerdp">
                                            <img className="mx-3 headphoto" src={msg.gender === "男" ? man : woman} style={{ "width": 50 }} alt="" />
                                            {msg.chatname}
                                        </div>

                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            {msg.text}
                                            {msg.unreadcount > 0 ? <span className="unread float-right">{msg.unreadcount}</span> : null}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="card col-7 my-2" onClick={this.goToChat}>
                                <div className="mt-2">

                                    <div className="headerdp">
                                        <img className="mx-3 headphoto" src={woman} style={{ "width": 50 }} alt="" />
                                        台北張阿姨

                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        今晚...我想來點麥當勞的薯條配可樂
                                        <span className="unread float-right">1</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card col-7 my-2">
                                <div className="mt-2">

                                    <div className="headerdp">
                                        <img className="mx-3 headphoto" src={woman} style={{ "width": 50 }} alt="" />
                                        香港趙阿姨
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        小鮮肉，今晚來找我嗎?
                                    </div>
                                </div>
                            </div>

                            <div className="card col-7 my-2">
                                <div className="mt-2">

                                    <div className="headerdp">
                                        <img className="mx-3 headphoto" src={woman} style={{ "width": 50 }} alt="" />
                                        內湖潘阿姨
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card-text">
                                        今晚來陪我，就算你PS5
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user, msgList: state.msgList, hubConnection: state.hubConnection }),
    { getMsgList }
)(Message);