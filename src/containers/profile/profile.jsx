import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getCookies } from '../../utils/index';
import { getUserDetail, addFriend, delFriend } from '../../redux/actions';
import ProfileDetail from '../../components/profile-detail/profile-detail';

import '../personal/personal.scss';
import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';

class MyProfile extends Component {


    addFriend = ({ memberid, friendid }) => {
        this.props.addFriend({ memberid, friendid });
    }

    delFriend = ({ memberid, friendid }) => {

        this.props.delFriend({ memberid, friendid });
    }

    componentDidMount() {
        //擷取要抓的用戶名
        const memberid = getCookies();
        const path = this.props.location.pathname;
        const routeparam = path.split("/");
        console.log("用戶資料", routeparam);
        this.props.getUserDetail({ memberid, username: routeparam[2] });
    }

    // goChat = (userid = 1) => {
        
    //     this.props.history.push(`/chat/${userid}`)
    // }

    render() {

        //const userInfo = this.props.user;
        

        return (
            <ProfileDetail userInfo={this.props.uerDetail} addFriend={this.addFriend} delFriend={this.delFriend} />
        );
    }
}

export default connect(
    state => ({ uerDetail: state.uerDetail }),
    { getUserDetail, addFriend, delFriend }
)(MyProfile);