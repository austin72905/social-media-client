import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCookies } from '../../utils/index';
import { getMsgList } from '../../redux/actions';

import man from '../../assets/man.png';
import woman from '../../assets/woman2.png';
import '../personal/personal.scss';

class Message extends Component {


    goToChat = (userid=1) => {
        const myid =getCookies();
        this.props.history.push(`/chat/${myid}+${userid}`)
    }

    componentDidMount() {
        const memberid = getCookies();
        this.props.getMsgList({ memberid });
    }

    render() {

        const { msgList } = this.props;

        return (
            <div className="mybody">
                <div className="outborder topborder">
                    <div className="container mt-3">
                        <div className="row justify-content-center">


                            {/*註解..當js寫*/}
                            {msgList.map((msg, index) => (
                                <div className="card col-7 my-2" onClick={()=>this.goToChat(msg.chatid)} key={index}>
                                    <div className="mt-2">

                                        <div className="headerdp">
                                            <img className="mx-3 headphoto" src={msg.gender==="男"?man:woman} style={{ "width": 50 }} alt="" />
                                            {msg.chatname}
                                    </div>

                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            {msg.text}
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
    state => ({ user: state.user, msgList: state.msgList }),
    { getMsgList }
)(Message);