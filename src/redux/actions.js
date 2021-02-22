import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqPersonal, reqUserDetail, reqSelectOption, reqFriend, reqAddFriend, reqDeleteFriend, reqMessage, reqMessageList, reqUnreadTotal, reqSaveMsg, reqUpdateUnread } from '../api/index';
import { SUCCESS_CODE } from '../api/respcode';
import { AUTH_SUCCESS, ERR_MSG, RECIEVE_USER, RESET_USER, RECIEVE_OPTIONS, RECIEVE_USERS, CONNECT_SUCCESS, RECIEVE_MSG, RECIEVE_MSG_LIST, RECIEVE_UNREAD_TOTAL, RESET_USER_DETAIL } from './action-types';

import { connectHub } from '../api/hubHelper';
import { getCookies, setCookies, removeCookies } from '../utils/index';


//同步 (要分發的action)
const authSucess = (user) => ({ type: AUTH_SUCCESS, data: user });
const errorMsg = (msg) => ({ type: ERR_MSG, data: msg });

const recieveUser = (user) => ({ type: RECIEVE_USER, data: user });
const resetUser = (msg) => ({ type: RESET_USER, data: msg });

const resetUserDetail = (msg) => ({ type: RESET_USER_DETAIL, data: msg });

const recieveUsers = (user) => ({ type: RECIEVE_USERS, data: user });

const recieveOptions = (options) => ({ type: RECIEVE_OPTIONS, data: options });

//chathub 連線
const recieveConnectHub = (hubConnection) => ({ type: CONNECT_SUCCESS, data: hubConnection });

//獲取訊息
const recieveMsg = (data) => ({ type: RECIEVE_MSG, data: data });

const recieveMsgList = (data) => ({ type: RECIEVE_MSG_LIST, data: data });

const recieveUnreadTotal = (data) => ({ type: RECIEVE_UNREAD_TOTAL, data: data });

//http://localhost:56825/register

//異步
export const register = (user) => {

    const { username, password, gender, confirm } = user;
    //前端驗證輸入資料是否正確
    if (!username) {
        return errorMsg("用戶名不得為空")

    } else if (!gender) {
        return errorMsg("性別不得為空")
    }
    else if (password !== confirm) {
        //異步的才需要dispatch
        return errorMsg("2次密碼不一致")
    }


    //表單數據合法
    return async (dispatch) => {
        //reqRegister 返回的 是一個promise obj，要用then 才能得到回傳的結果
        // const response = reqRegister(user).then(response => {
        //     const result = response.data;
        // });

        //可以修改成await 會自動時做then 可以直接拿到後端回傳結果
        const response = await reqRegister(user);
        const result = response.data;
        console.log(result);
        //後台回傳的訊息 { code:0 , msg: "註冊成功" , data: { username: "austin", gender: "男", memberid: 1, isRegist: true } }
        if (result.code === SUCCESS_CODE) {
            //成功
            //設置Cookie
            setCookies(result.data.memberID);
            //Cookies.set("userid", result.data.memberID, { expires: 7 });
            setCookies(result.data.username, "username");
            //設定token
            setCookies(result.token, "token");
            //分發(dispatch) 成功的action
            dispatch(authSucess(result.data));
        } else {
            //失敗
            //分發(dispatch) 失敗的action
            dispatch(errorMsg(result.msg));
        }
    }
}

export const login = (user) => {

    const { username, password } = user;
    //前端驗證輸入資料是否正確
    if (!username) {
        return errorMsg("用戶名不得為空")
    } else if (!password) {
        //異步的才需要dispatch
        return errorMsg("密碼不得為空")
    }

    return async (dispatch) => {
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code === SUCCESS_CODE) {
            //成功
            console.log(result);
            //設置Cookie
            const userid = getCookies();
            const username = getCookies("username");
            const token = getCookies("token");
            if (!userid || !token || !username) {
                setCookies(result.data.memberID);
                setCookies(result.data.username, "username");
                //設定token
                setCookies(result.token, "token");
                //Cookies.set("userid", result.data.memberID, { expires: 7 });
            }
            //分發(dispatch) 成功的action
            dispatch(authSucess(result.data));
        } else {
            //失敗
            //分發(dispatch) 失敗的action
            dispatch(errorMsg(result.msg));
        }
    }
}

export const updateUser = (memberid,user) => {
    const { job, username, nickname, state, preferType, interest, introduce } = user;

    //返回一個函數
    return async (dispatch) => {
        const response = await reqUpdateUser(memberid,{ job, username, nickname, state, preferType, interest, introduce });
        const reult = response.data;
        if (reult.code === SUCCESS_CODE) {//更新成功: data
            dispatch(recieveUser(reult.data));
        } else {//更新失敗: msg
            dispatch(resetUser(reult.msg));
        }
    }
}

//獲取用戶列表
export const getUser = ({ memberid }) => {

    //異步ajax
    return async (dispatch) => {
        const response = await reqUser({ memberid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            dispatch(recieveUsers(result.data));
        }
    }
}

//獲取朋友列表
export const getFrined = ({ memberid }) => {

    //異步ajax
    return async (dispatch) => {
        const response = await reqFriend({ memberid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            dispatch(recieveUsers(result.data));
        }
    }
}

//加好友
export const addFriend = (user) => {

    //異步ajax
    return async (dispatch) => {
        const response = await reqAddFriend(user);
        const result = response.data;
        console.log(result.msg);
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            dispatch(recieveUsers(result.data));
        }
    }
}

//刪除好友
export const delFriend = (user) => {
    console.log("要刪除的資料", user);
    //const {memberid,friendid}=user;


    //異步ajax
    return async (dispatch) => {
        const response = await reqDeleteFriend(user);
        const result = response.data;
        console.log(result.msg);
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            dispatch(recieveUsers(result.data));
        }
    }
}

//獲取個人信息
export const getPersonal = ({ memberid }) => {
    console.log("跑getPersonal");
    return async (dispatch) => {
        const response = await reqPersonal({ memberid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveUser(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }

    }
}


//獲取興趣、偏好類型
export const getSelectOption = () => {
    return async (dispatch) => {
        const response = await reqSelectOption();
        const result = response.data;
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveOptions(result.data));
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

//獲取用戶信息
export const getUserDetail = ({ memberid, userprofile }) => {
    console.log("跑getUserDetail");
    return async (dispatch) => {
        const response = await reqUserDetail({ memberid, userprofile });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveUser(result.data));
        } else {
            dispatch(resetUserDetail(result.msg));
        }

    }
}

//登出
export const logout = () => {
    return async (dispatch) => {
        removeCookies();
        //Cookies.remove("userid");
        console.log("清除cookie");
        dispatch(resetUser("登出成功"));
    }

}


//chathub連線
export const connectToHub = (memberid) => {
    //創建一個實例
    // const HubConnection = new HubConnectionBuilder()
    //     .withUrl(`${process.env.REACT_APP_URL}/chathub`).withAutomaticReconnect().build();

    // const hub =HubConnection;
    return async (dispatch) => {
        //連線
        const result = await connectHub(memberid);

        console.log("連線結果", result);
        // HubConnection.invoke("AddConnectList", memberid, "")
        //     .catch(err => console.log(err));

        if (result.hub) {
            dispatch(recieveConnectHub(result.hub));
        } else {

        }




    }
}

//獲取訊息
export const getMsg = ({ memberid, recieveid }) => {
    return async (dispatch) => {
        const response = await reqMessage({ memberid, recieveid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveMsg(result.data));
        } else {
            console.log("不明原因失敗", result.data)
        }

    }
}

//獲取對每個用戶的最後訊息
export const getMsgList = ({ memberid }) => {
    return async (dispatch) => {
        const response = await reqMessageList({ memberid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveMsgList(result.data));
        } else {
            console.log("不明原因失敗", result.data)
        }
    }
}

export const getMsgUnread = ({ memberid }) => {
    return async (dispatch) => {
        const response = await reqUnreadTotal({ memberid });
        const result = response.data;
        //後端回傳訊息成功
        if (result.code === SUCCESS_CODE) {
            console.log(result.data)
            dispatch(recieveUnreadTotal(result.data));
        } else {
            console.log("不明原因失敗", result.data)
        }
    }
}

//修改成已讀
export const updateToRead = ({ memberid, recieveid }) => {
    return async (dispatch) => {
        const response = await reqUpdateUnread({ memberid, recieveid });
    }
}

//儲存訊息
export const saveChatMsgs = ({ memberid, recieveid, input }) => {
    return async (dispatch) => {
        const response = await reqSaveMsg({ memberid, recieveid, input });
    }
}