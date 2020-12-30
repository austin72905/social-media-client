import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getCookies } from '../../utils/index';
import './user-list.scss';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired,
        addFriend: PropTypes.func.isRequired,
    }

    addFriend = (friendid) => {
        const memberid = getCookies();
        this.props.addFriend({ memberid, friendid });
    }

    goChat = (userid = 1) => {
        const myid = getCookies();
        this.props.history.push(`/chat/${myid}+${userid}`);
    }

    goProfile = (profile ="austin")=>{
        this.props.history.push(`/profile/${profile}`)
    }

    render() {

        const { userList } = this.props;

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3 ">
                        <div className="row justify-content-center">
                            {
                                userList.map(user => (
                                    <div className="card col-7 my-2" key={user.memberID} >
                                        <div className="mt-2">
                                            <div className="headerdp">
                                                <img className="mx-3 headphoto" src={user.gender==="女"?woman:man} style={{ "width": 90 }} alt="" />
                                                <button className="btn btn-secondary float-right " onClick={() => this.goChat(user.memberID)}>私聊</button>
                                                <button className="btn btn-danger float-right btnsz btnszmb btn-xs mr-3" onClick={() => this.addFriend(user.memberID)}>加好友</button>

                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <div className="card-title" onClick={()=>this.goProfile(user.username)}>
                                                <h5>{user.nickname}</h5>
                                            </div>
                                            <div className="card-text">
                                                <div>
                                                    {user.introduce}
                                                </div>
                                                <div>
                                                    {user.state}
                                                </div>

                                            </div>
                                        </div>
                                    </div>))
                            }


                            <div className="card col-7 my-2">
                                <div className="">
                                    大頭貼
                                </div>
                                <div className="card-body">
                                    <div className="card-title">
                                        <h5>內湖王阿姨</h5>
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
                                        <h5>香港趙阿姨</h5>
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

export default withRouter(UserList);