import ajax from './ajax';
//多個請求函數  export fuction XXX(){} 可以改成 XXX = ()=>{}
//返回一個promise obj

export const reqRegister = ({ username, password }) => ajax(`${process.env.REACT_APP_URL}/register`, { username, password }, "POST");

export const reqLogin = ({ username, password }) => ajax(`${process.env.REACT_APP_URL}/login`, { username, password }, "POST");

export const reqUpdateUser = (user) => ajax(`${process.env.REACT_APP_URL}/memberinfo/update`, user, "POST");

//獲取用戶列表
export const reqUser = ()=> ajax(`${process.env.REACT_APP_URL}/memberinfo`);

//獲取朋友列表
export const reqFriend =()=>ajax(`${process.env.REACT_APP_URL}/friend`);

//加好友
export const reqAddFriend =({ memberid, friendid })=>ajax(`${process.env.REACT_APP_URL}/friend/add`,{ memberid, friendid },"POST");

//刪除好友
export const reqDeleteFriend =({ memberid, friendid })=>ajax(`${process.env.REACT_APP_URL}/friend/delete`,{ memberid, friendid },"POST");

//獲取個人信息
export const reqPersonal= ({memberid})=> ajax(`${process.env.REACT_APP_URL}/personal`,{memberid});

//獲取興趣、偏好類型
export const reqSelectOption = ()=> ajax(`${process.env.REACT_APP_URL}/personal/SelectOption`);

//獲取用戶信息
export const reqUserDetail= ({memberid,username})=> ajax(`${process.env.REACT_APP_URL}/profile`,{memberid,username});

//獲取訊息
export const reqMessage= ({memberid,recieveid})=> ajax(`${process.env.REACT_APP_URL}/message`,{memberid,recieveid});

//獲取訊息列表
export const reqMessageList= ({memberid})=> ajax(`${process.env.REACT_APP_URL}/message/LastMsgs`,{memberid});