import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCookies } from '../../utils/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getMsgUnread } from '../../redux/actions';
import './nav-footer.scss';


class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
    }

    state = {
        currentPath: "",
        unreadTotal: 0,
        msgUnread: {}
    }

    //hub 狀態
    hubstate = false;
    //是否要繼續連線
    keepconnect = true;

    //計算未讀數量
    getUnreadToTal = (chatid = 0, unread = 0) => {
        let { msgUnread } = this.props;
        let unreadTotal = 0;
        console.log("裡面是啥", this.props);
        //0 代表第一次從後端撈資料 ， 其他都是 signalr invoke
        if (chatid !== 0) {
            if (unread !== 0) {
                msgUnread[chatid] += 1;
            } else {
                //把已讀的部分銷掉
                msgUnread[chatid] = 0;
            }

        }

        Object.keys(msgUnread).forEach(key => {
            unreadTotal += msgUnread[key];
        });
        this.setState({ unreadTotal, msgUnread });
    }

    async componentDidMount() {
        console.log("...", this.props)
        const userid = getCookies();
        await this.props.getMsgUnread({ memberid: userid });
        this.getUnreadToTal();

        //確保不會 connect on null
        // if(!this.props.hubConnection){
        //     this.props.hubConnection.on("ChangeTotal", (chatid, unread) => {
        //         //已讀
        //         this.getUnreadToTal(chatid, unread);
        //     })

        // }




    }
    //確保不會連到null
    componentDidUpdate() {
        //如果連線到
        if (this.props.hubConnection) {
            this.hubstate = true;
        }

        if (this.hubstate && this.keepconnect) {
            this.props.hubConnection.on("ChangeTotal", (chatid, unread) => {
                //         //已讀
                this.getUnreadToTal(chatid, unread);
            })
        }
        //確保on 之後不會重複on
        if(this.hubstate){
            this.keepconnect =false;
        }



    }

    redirectToPage = (nav, e) => {
        e.preventDefault();
        this.setState({ currentPath: nav.path });
        console.log("now:  ", this.props)

        this.props.history.replace(nav.path);

    }

    render() {

        const { navList, msgUnread } = this.props;
        const { currentPath, unreadTotal } = this.state;
        //console.log("未讀型別",msgUnread)
        //console.log("總未讀",unreadTotal)
        return (
            <nav className="nav nav-pills fixed-bottom " role="navigation">
                <div className="container justify-content-center">
                    <div className="row justify-content-center">
                        {
                            navList.map((nav, index) => (
                                nav.path !== "/memberinfo" ?
                                    <div className="col-xs mx-4" key={index}>
                                        <a href="#" className={`nav-link nav-item ${nav.path === currentPath ? "active" : null}`} onClick={(e) => this.redirectToPage(nav, e)}>
                                            {nav.icon}
                                            {nav.path === "/message" && unreadTotal > 0 ? <span className="unreadn">{unreadTotal}</span> : null}
                                        </a>
                                    </div> : null

                            ))
                        }


                    </div>

                </div>

            </nav>
        );
    }
}

//內部會像組件傳入一些路由組件特有的屬性 history /location
export default connect(
    state => ({ msgUnread: state.msgUnread, hubConnection: state.hubConnection }),
    { getMsgUnread }
)(withRouter(NavFooter));