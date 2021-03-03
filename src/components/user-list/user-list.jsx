import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { getCookies } from '../../utils/index';
import './user-list.scss';
import '../../scss/main.scss';
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
        this.props.history.push(`/chat/${userid}`);
    }

    goProfile = (profile = "austin") => {
        console.log("搜尋姓名: ", profile);
        this.props.history.push(`/profile/${profile}`)
    }

    render() {

        let { userList } = this.props;
        const memberid = getCookies();
        userList = userList.filter(user => user.memberID !== parseInt(memberid));
        return (
            <div className="mybody ">
                <div className="outborder topborder">
                    <div className="container mt-3 ">
                        <div className="row justify-content-center">
                            
                            <UserListContent userList={userList} goChat={this.goChat} goProfile={this.goProfile} addFriend={this.addFriend}/>

                        </div>
                    </div>
                </div>


            </div>
        );
    }
}


function UserListContent(props) {
    return (
        <Fragment>
            {
                props.userList.map(user => (
                    <div className="card col-7 my-2" key={user.memberID} >
                        <div className="mt-2">
                            <div className="headerdp">
                                <img className="mx-3 headphoto" src={user.gender === "女" ? woman : man} style={{ "width": 90 }} alt="" />
                                <button className="btn btn-secondary float-right " onClick={() => props.goChat(user.memberID)}>私聊</button>
                                <button className="btn btn-danger float-right btnsz btnszmb btn-xs mr-3" onClick={() => props.addFriend(user.memberID)}>加好友</button>

                            </div>
                        </div>

                        <div className="card-body">
                            <div className="card-title" onClick={() => props.goProfile(user.username)}>

                                <h5 className="ustl">{user.nickname}</h5>
                                <h6 className="ustl ml-2">{" ( " + user.username + " )"}</h6>


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

        </Fragment>
    );
}


export default withRouter(UserList);