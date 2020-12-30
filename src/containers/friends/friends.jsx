import React, { Component } from 'react';
import { connect } from 'react-redux';

import FriendList from '../../components/friend-list/friend-list';
import { getFrined, delFriend } from '../../redux/actions';



class Friends extends Component {

    state = {
        memberid: "",
        friendid: ""
    }
    //friendList=[];
    componentDidMount() {
        //console.log("...",this.props.delFriend(this.state));
        this.props.getFrined();

    }

    delFriend = ({ memberid, friendid }) => {

        this.props.delFriend({ memberid, friendid });
    }

    render() {
        //const data = this.state;
        return (
            <FriendList friendList={this.props.userList} delFriend={this.delFriend} />
        );
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getFrined, delFriend }
)(Friends)