import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MemberInfo from '../member-info/member-info';
import MemberList from '../memberlist/member-list';
import Message from '../message/message';
import Personal from '../personal/personal';
import Friends from '../friends/friends';
import NavFooter from '../../components/nav-footer/nav-footer';
import NotFound from '../../components/not-found/not-found';
import Chat from '../chat/chat';
import MyProfile from '../profile/profile';

import { getCookies,getRedirectTo } from '../../utils/index';
import { getUser, getPersonal, connectToHub, getMsgUnread } from '../../redux/actions';

import './main.scss';
import { BsChevronLeft, BsFillGearFill, BsFillChatDotsFill, BsHeartFill, BsFillPeopleFill } from 'react-icons/bs';
//主介面路由
class Main extends Component {

    //運用陣列管理navbar 以及路由
    navlist = [
        {
            path: "/friends",
            component: Friends,
            title: "好友列表",
            icon: <BsFillPeopleFill />,
        },
        {
            path: "/memberlist",
            component: MemberList,
            title: "用戶列表",
            icon: <BsHeartFill />,
        },
        {
            path: "/message",
            component: Message,
            title: "訊息",
            icon: <BsFillChatDotsFill />,
        },
        {
            path: "/personal",
            component: Personal,
            title: "個人訊息",
            icon: <BsFillGearFill />,
        },


    ];

    //其他路由
    otherList = [
        {
            path: "/chat",
            title: "聊天室",
        },
        {
            path: "/profile",
            title: "",
        },
    ];

    //尋找路由、切割
    getPathAndParams = () => {
        const path = this.props.location.pathname;
        console.log(path);
        //切割路由
        const routeparam = path.split("/");
        console.log("midroute", routeparam);
        const route = routeparam[1];
        return { path, route };
    }

    //判斷是nav裡的路由還是其他
    prepareRoute = (path, route) => {
        //有 nav 的路由
        let currentNav = this.navlist.find(nav => nav.path === path);
        console.log("是否找到路徑", currentNav)
        //其他路徑
        let otherPath = this.otherList.find(i => i.path.startsWith("/" + route));
        console.log("其他路徑", otherPath)

        return { currentNav, otherPath };

    }

    //發送ajax請求獲取用戶數據
    componentDidMount() {
        const userid = getCookies();
        const { memberID } = this.props.user;
        //登錄過，但目前還沒有登入(redux 管理的user裡沒有_id) ，發請求
        if (userid && !memberID) {
            this.props.getPersonal({ memberid: userid });
            console.log("獲取後台請求")

        }
        //連線到chathub
        if (!this.props.hubConnection) {
            this.props.connectToHub(userid);
        }




    }

    redirectToPage = (nav, e) => {
        e.preventDefault();
        this.props.history.replace(nav.path);

    }

    //回到上一頁
    goLastPage = () => {
        this.props.history.goBack();
    }

    render() {
        //讀取cookie
        const userid = getCookies();

        //如果cookie 沒有值，回Login
        if (!userid) {
            return <Redirect to="login" />
        }

        //以下都是cookie 有值了
        //如果有就去讀取redux 的狀態     
        const { user } = this.props;
        console.log("是否有user", user);
        //如果user 裡面沒有_id 返回null(不做任何顯示)
        if (!user.memberID) {
            
            return null;
                
            //會這樣寫是因為登錄過，但目前還沒有登入(redux 管理的user裡沒有_id)
            //之後會再 componentDidMount() 從後台獲取資料 ， 就跑到下面的 else
        }

        //如果有，顯示對應的頁面
        //現在的路由位置
        const { path, route } = this.getPathAndParams();

        if (path === "/") {
            return <Redirect to="/memberlist" />
        }

        let { currentNav, otherPath } = this.prepareRoute(path, route);
        //如果輸入奇怪的路徑，導回/memberlist
        if (!otherPath && !currentNav) {

            return <Redirect to="/memberlist" />;

        }

        //如果是要看個人資料
        //js 怪怪的 前面明明判斷!otherPath 就return 應該不會跑下面的，但是他會繼續跑所以要加 if(otherPath) 確保otherPath 不是 undifined
        if (otherPath) {
            if (otherPath.path === "/profile") {
                //讓標題顯示去訪問的用戶
                otherPath.title = "用戶訊息";
            }
        }






        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mynav">
                    <a className="navbar-brand" >
                        <span className="h4 mx-3 ">{!currentNav ?
                            <span>
                                <BsChevronLeft className="pb-2 mr-3" onClick={this.goLastPage} />
                                {otherPath.title}
                            </span>
                            : currentNav.title}</span>
                    </a>
                </nav>
                <p></p>

                <Switch>
                    {
                        this.navlist.map((nav) => <Route path={nav.path} exact component={nav.component} key={nav.path} />)
                    }

                    <Route path="/chat/:userid" component={Chat} />
                    <Route path="/profile/:username" component={MyProfile} />
                    {/*如果什麼都找不到就到這個*/}
                    <Route component={NotFound} />

                </Switch>

                {/*下方導覽列*/}
                {currentNav || otherPath.path === "/profile" ? <NavFooter navList={this.navlist} /> : null}
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user, hubConnection: state.hubConnection, msgUnread: state.msgUnread }),
    { getUser, getPersonal, connectToHub, getMsgUnread } //getUser
)(Main);