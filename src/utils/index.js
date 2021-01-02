import Cookies from 'js-cookie';

function getRedirectTo(isRegist=false) {
    let path = "";
    // if(gender==="男"){
    //     path ="/female";
    // }else{
    //     path ="/male";
    // }
    //只有地一次註冊會導向完善訊息介面
    if (isRegist) {
        path = "/personal";
    } else {
        path = "/memberlist";
    }
    return path;

}

function getCookies(userid = "userid") {
    const cookie = Cookies.get(userid);
    return cookie;
}

function setCookies(content, userid = "userid") {
    Cookies.set(userid, content, { expires: 7 });
}

function removeCookies(userid = "userid") {
    Cookies.remove(userid);
}



export { getRedirectTo, getCookies, setCookies, removeCookies };