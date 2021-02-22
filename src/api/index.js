import ajax from './ajax';

import { getCookies } from '../utils/index';
//多個請求函數  export fuction XXX(){} 可以改成 XXX = ()=>{}
//返回一個promise obj

const token = getCookies("token");
const username = getCookies("username");

export const reqRegister = ({ username, password, gender }) => ajax(`${process.env.REACT_APP_URL}/register`, { username, password, gender }, "POST");

export const reqLogin = ({ username, password }) => ajax(`${process.env.REACT_APP_URL}/login`, { username, password }, "POST");

export const reqUpdateUser = (memberid,{ job, username, nickname, state, preferType, interest, introduce }) => ajax(`${process.env.REACT_APP_URL}/personal/update`, {memberid,data:{ job, username, nickname, state, preferType, interest, introduce },username, token}, "POST");

//獲取用戶列表
export const reqUser = ({ memberid }) => ajax(`${process.env.REACT_APP_URL}/memberinfo`, { memberid, username, token });

//獲取朋友列表
export const reqFriend = ({ memberid }) => ajax(`${process.env.REACT_APP_URL}/friend`, { memberid, username, token });

//加好友
export const reqAddFriend = ({ memberid, friendid }) => ajax(`${process.env.REACT_APP_URL}/friend/add`, { memberid, friendid, username, token }, "POST");

//刪除好友
export const reqDeleteFriend = ({ memberid, friendid }) => ajax(`${process.env.REACT_APP_URL}/friend/delete`, { memberid, friendid, username, token }, "POST");

//獲取個人信息
export const reqPersonal = ({ memberid }) => ajax(`${process.env.REACT_APP_URL}/personal`, { memberid, username, token });

//獲取興趣、偏好類型
export const reqSelectOption = () => ajax(`${process.env.REACT_APP_URL}/personal/SelectOption`);

//獲取用戶信息
export const reqUserDetail = ({ memberid, userprofile }) => ajax(`${process.env.REACT_APP_URL}/profile`, { memberid, userprofile, username, token });

//獲取訊息
export const reqMessage = ({ memberid, recieveid }) => ajax(`${process.env.REACT_APP_URL}/message`, { memberid, recieveid, username, token });

//獲取訊息列表
export const reqMessageList = ({ memberid }) => ajax(`${process.env.REACT_APP_URL}/message/LastMsgs`, { memberid, username, token });

//獲取未讀訊息總數
export const reqUnreadTotal = ({ memberid }) => ajax(`${process.env.REACT_APP_URL}/message/UnreadMsg`, { memberid, username, token });

//將資料庫改成已讀
export const reqUpdateUnread = ({ memberid, recieveid }) => ajax(`${process.env.REACT_APP_URL}/chat/UpToread`, { memberid, recieveid, username, token });

//發送訊息時，將資料存進資料庫
export const reqSaveMsg = ({ memberid, recieveid, input }) => ajax(`${process.env.REACT_APP_URL}/chat/SaveMsgs`, { memberid, recieveid, input, username, token }, "POST");