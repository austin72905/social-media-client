import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';

import { getCookies } from '../../utils/index';
import { getMsgList } from '../../redux/actions';

import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
import './message.scss';
import '../../scss/main.scss';

class Message extends Component {

    state = {
        msgList: [],
        unread: 0,
    }

    goToChat = (userid = 1) => {
        const myid = getCookies();
        this.props.history.push(`/chat/${userid}`)
    }

    async componentDidMount() {
        const memberid = getCookies();
        await this.props.getMsgList({ memberid });
        const { msgList } = this.props;
        this.setState({ msgList });
        this.props.hubConnection.on("SendLastMsg", (msg) => {
            //如果傳進來的msg 的 chatid 已經存在就覆蓋，不存在就新增
            let msgList = this.state.msgList;
            const msgexisted = msgList.find(i => i.chatid === msg.chatid);
            //計算對每個用戶的未讀訊息量
            let lastUnreadCount = 0;
            //如果已經有聊天過就把原本的內容過濾掉，最後再新增
            if (msgexisted) {
                msgList = msgList.filter(i => i.chatid !== msg.chatid);
                lastUnreadCount = msgexisted.unreadcount;
            }
            //統計到最新的未讀數量
            msg.unreadcount += lastUnreadCount;
            msgList.push(msg);
            console.log("最後列表", msgList)


            this.setState({ msgList });
        })

        //當進入過聊天室，將unreadcount 重置為0
        this.props.hubConnection.on("ChangeToRead", (userid, read) => {
            console.log("進來了")
            //如果傳進來的msg 的 chatid 已經存在就覆蓋，不存在就新增
            let msgList = this.state.msgList;
            const msgexisted = msgList.find(i => i.chatid == userid);
            //計算對每個用戶的未讀訊息量

            //如果已經有聊天過就把原本的內容過濾掉，最後再新增
            if (msgexisted) {

                //把那個id 的 的 unread 改成0
                msgList.forEach(msg => {
                    if (msg.chatid == userid) {
                        msg.unreadcount = read
                    }
                })
                console.log("修改已讀後列表", msgList)
                this.setState({ msgList });
            }





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
                            {/* {msgList.map((msg, index) => (
                                <div className="card col-7 my-2" onClick={() => this.goToChat(msg.chatid)} key={index}>
                                    <div className="mt-2">

                                        <div className="headerdp">
                                            <img className="mx-3 headphoto" src={msg.gender === "男" ? man : woman} style={{ "width": 50 }} alt="" />
                                            {msg.chatname == null ? msg.username : msg.chatname}
                                        </div>

                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            {msg.text}
                                            {msg.unreadcount > 0 ? <span className="unread float-right">{msg.unreadcount}</span> : null}
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                            {msgList !==[]?<MsgBox msgList={msgList} goToChat={this.goToChat}/>:null}



                        </div>

                    </div>


                </div>
            </div>
        );
    }
}



function MsgBox(props) {
    return (
        <Fragment>
            {props.msgList.map((msg, index) => (
                <div className="card col-7 my-2" onClick={() => props.goToChat(msg.chatid)} key={index}>
                    <div className="mt-2">

                        <div className="headerdp">
                            <img className="mx-3 headphoto" src={msg.gender === "男" ? man : woman} style={{ "width": 50 }} alt="" />
                            {msg.chatname == null ? msg.username : msg.chatname}
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
        </Fragment>

    );
}



export default connect(
    state => ({ user: state.user, msgList: state.msgList, hubConnection: state.hubConnection }),
    { getMsgList }
)(Message);