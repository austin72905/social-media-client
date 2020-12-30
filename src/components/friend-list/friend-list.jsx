import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getCookies } from '../../utils/index';

import './friend-list.scss';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
class FriendList extends Component {

    static propTypes = {
        friendList: PropTypes.array.isRequired,
        delFriend: PropTypes.func.isRequired,
    }

    delFriend = (friendid) => {
        const memberid = getCookies();
        //調用父組件傳進來的func    
        this.props.delFriend({ memberid, friendid });
    }

    goChat = (userid) => {
        const myid = getCookies();
        this.props.history.push(`/chat/${myid}+${userid}`)
    }

    goProfile = (profile ="austin")=>{
        this.props.history.push(`/profile/${profile}`)
    }

    render() {

        const { friendList } = this.props;

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">
                            {
                                friendList.map(friend => (
                                    <div className="card col-7 my-2" key={friend.memberID} >
                                        <div className="mt-2">

                                            <div className="headerdp">
                                                <img className="mx-3 headphoto" src={friend.gender==="女"?woman:man} style={{ "width": 90 }} alt="" />
                                                <button className="btn btn-secondary float-right " onClick={() => this.goChat(friend.memberID)}>私聊</button>
                                                <button className="btn btn-outline-secondary float-right btnsz mr-3" onClick={() => this.delFriend(friend.memberID)}>解除好友</button>

                                            </div>

                                        </div>
                                        <div className="card-body">
                                            <div className="card-title" onClick={()=>this.goProfile(friend.username)}>
                                                <h5>{friend.nickname}</h5>
                                            </div>
                                            <div className="card-text">
                                                <div>
                                                    {friend.introduce}
                                                </div>
                                                <div>
                                                    {friend.state}
                                                </div>
                                            </div>
                                        </div>
                                    </div>))
                            }
                            <div className="card col-7 my-2">
                                <div className="mt-2">

                                    <div className="headerdp">
                                        <img className="mx-3 headphoto" src={woman} style={{ "width": 90 }} alt="" />
                                        <button className="btn btn-secondary float-right " onClick={() => this.goChat()}>私聊</button>
                                        <button className="btn btn-outline-secondary float-right btnsz mr-3">解除好友</button>

                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>台北張阿姨</h5>
                                    </div>
                                    <div className="card-text">
                                        個人訊息
                                    </div>
                                </div>
                            </div>

                            <div className="card col-7 my-2">
                                <div className="">
                                    大頭貼
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>日本石田阿姨</h5>
                                    </div>

                                    <div className="card-text">
                                        個人訊息
                                    </div>

                                </div>
                            </div>

                            <div className="card col-7 my-2">
                                <div className="">
                                    大頭貼
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>台北潘阿姨</h5>
                                    </div>
                                    <div className="card-text">
                                        個人訊息
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

export default withRouter(FriendList);