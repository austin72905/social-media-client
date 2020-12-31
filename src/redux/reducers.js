import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERR_MSG, RECIEVE_USER, RESET_USER, RECIEVE_OPTIONS,RECIEVE_USERS,CONNECT_SUCCESS,RECIEVE_MSG,RECIEVE_MSG_LIST } from './action-types';

import { getRedirectTo } from '../utils/index';
import { func } from 'prop-types';

//目的是返回新狀態
//action.type 不能重複使用...一個reducer 就用一個 ，如果共用就會都跑應該是沒有break 的關係? 所以一直往下跑

const initUser = {
    userame: "",
    gender: "",
    msg: "", //錯誤訊息
    redirectTo: "", //驗證成功才會跳轉
}
//user 狀態
//存放後台傳來的訊息
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data 是user            
            const { gender, isRegist } = action.data;
            return { ...action.data, redirectTo: getRedirectTo(gender, isRegist) }; //{...state,...action.data} 也可以這樣寫，可以把裡面的值解構出來，並取代
        case ERR_MSG:   //data 是 msg
            return { ...state, msg: action.data };
        case RECIEVE_USER:   //data 是 user 
            console.log("RECIEVE_USER");
            return action.data; //不需要跳轉
        case RESET_USER:   //data 是 msg
            console.log("RESET_USER", { ...initUser, msg: action.data });
            return { ...initUser, msg: action.data }; //更新失敗就整個頁面讓他清空吧
        default:
            return state;
    }
};

const initOption = {
    interests: [""],
    preferTypes: [""],
    msg: "",
}

function selectOption(state = initOption, action) {
    switch (action.type) {
        case RECIEVE_OPTIONS:
            console.log("RECIEVE_OPTIONS")
            return action.data;
        case RESET_USER:   //data 是 msg
            console.log("RESET_USER");
            return { ...initOption, msg: action.data }; //更新失敗就整個頁面讓他清空吧
        default:
            return state;

    }
}

const initUserList = [];

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECIEVE_USERS:
            console.log("RECIEVE_USERS");
            return action.data; //不需要跳轉
        default:
            return state;
    }
}

//chathub連線
const Hubconnection=null;

function hubConnection(state=Hubconnection,action){
    switch(action.type){
        case CONNECT_SUCCESS:
            return action.data;
        default:
            return state;

    }
}

const initMsg=[]

function msgs(state=initMsg,action){
    switch(action.type){
        case RECIEVE_MSG:
            return action.data;
        default:
            return state;
    }
}

function msgList(state=initMsg,action){
    switch(action.type){
        case RECIEVE_MSG_LIST:
            return action.data;
        default:
            return state;
    }
}

function xxx(state = 0, action) {
    return state;
}

function yyy(state = 0, action) {
    return state;
}

//以他管理state
export default combineReducers({
    xxx,
    yyy,
    user, // {}
    selectOption,
    userList,
    //連線實體
    hubConnection,
    //獲取訊息
    msgs,
    //獲取最後的訊息
    msgList
});

//登入時
//主介面路由(男、女)
//進階訊息路由

//判斷標準
//gender
//只有驗證才會跑這個 到進階訊息路由