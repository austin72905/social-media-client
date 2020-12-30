import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/user-list/user-list';
import { getUser,addFriend } from '../../redux/actions';

class MemberList extends Component {

    //userList = [];

    componentDidMount() {
        this.props.getUser();
        
    }

    addFriend = ({memberid,friendid})=>{
        this.props.addFriend({memberid,friendid});
    }

    render() {
        console.log(this.props.userList);
        return (
            <UserList userList={this.props.userList} addFriend={this.addFriend}/>
        );
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUser,addFriend }
)(MemberList);