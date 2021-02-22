import axios from 'axios';

//封裝axios
//返回是一個promise obj
function ajax(url, data = {}, method = "GET") {
    console.log("請求地址",url)
    //data: { username : "austin",password : 123 }
    //get 請求
    if (method === "GET") {

        //url?key=value&key=value
        let queryStr = "";
        let queryArr = [];
        //Object.keys(data) 會得到一個陣列
        Object.keys(data).forEach(key => {
            queryArr.push(key + "=" + data[key]);
        });

        queryStr = queryArr.join("&");
        //拼接queryString
        if (queryStr !== "") {
            url = url+ "?" + queryStr;
        }
        console.log("請求地址get",url)
        return axios.get(url);
    }
    console.log("請求參數data",data);
    return axios.post(url, data);
}

export default ajax;