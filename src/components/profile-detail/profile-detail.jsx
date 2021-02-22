import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NotFound from '../not-found/not-found';

import '../../scss/main.scss';
import './profile-detail.scss';

import { getCookies } from '../../utils/index';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';


class ProfileDetail extends Component {

    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        addFriend: PropTypes.func.isRequired,
        delFriend: PropTypes.func.isRequired,
    }

    noContent = "沒有內容";

    addFriend = (friendid) => {
        const memberid = getCookies();
        this.props.addFriend({ memberid, friendid });
    }

    delFriend = (friendid) => {
        const memberid = getCookies();
        //調用父組件傳進來的func    
        this.props.delFriend({ memberid, friendid });
    }

    goChat = (userid = 1) => {
        const myid = getCookies();
        this.props.history.push(`/chat/${myid}+${userid}`)
    }

    render() {
        const userInfo = this.props.userInfo;
        const noContent = this.noContent;

        if(userInfo.memberID===0){
            return (<NotFound/>);
        }

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">
                            <div className="card col-7 my-2">
                                <div className="mt-2">

                                    <div className="headerdp">
                                        <img className="mx-3 headphoto" src={userInfo.gender==="女"?woman:man} style={{ "width": 90 }} alt="" />
                                        <button className="btn btn-secondary float-right " onClick={() => this.goChat()}>私聊</button>
                                        {
                                            userInfo.isFriend ? 
                                            <button className="btn btn-outline-secondary float-right btnsz mr-3" onClick={() => this.delFriend(userInfo.memberID)}>解除好友</button> 
                                            : <button className="btn btn-danger float-right btnsz btnszmb btn-xs mr-3" onClick={() => this.addFriend(userInfo.memberID)}>加好友</button>
                                        }



                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>{userInfo.nickname ? userInfo.nickname : ""}</h5>
                                        <h5>{userInfo.username ? "( "+userInfo.username+" )" : noContent}</h5>
                                    </div>
                                    <div className="card-text">
                                        <div className="mt-3 ">
                                            <div className="itdtitle">職業</div>
                                            <div className="mt-3">{userInfo.job ? userInfo.job : noContent}</div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="itdtitle">興趣</div>
                                            <div className="mt-3">{userInfo.interest ? userInfo.interest : noContent}</div>

                                        </div>
                                        <div className="mt-3">
                                            <div className="itdtitle">狀態</div>
                                            <div className="mt-3">{userInfo.state ? userInfo.state : noContent}</div>

                                        </div>
                                        <div className="mt-3">
                                            <div className="itdtitle">希望對象的類型</div>
                                            <div className="mt-3">{userInfo.preferType ? userInfo.preferType : noContent}</div>

                                        </div>
                                        <div className="mt-3">
                                            <div className="itdtitle">自我介紹</div>
                                            <div className="mt-3">{userInfo.introduce?userInfo.introduce:noContent}</div>

                                        </div>

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

export default withRouter(ProfileDetail);