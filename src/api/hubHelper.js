import { HubConnectionBuilder } from '@microsoft/signalr';

//創建一個實例
const HubConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_URL}/chathub`).withAutomaticReconnect().build();


export const connectHub = (memberid) => {
    const result = HubConnection.start()
        .then(() => console.log("連線成功"))
        .then(() => {
            registIdToHub(memberid);
            return { hub: HubConnection, msg: "連線與註冊成功" };
        })
        .catch(err => {
            console.log("連線失敗", err);
            return { hub: null, msg: "連線失敗" };
        })

    return result;
}
//註冊connection id to server
export const registIdToHub = (memberid) => {
    HubConnection.invoke("AddConnectList", memberid, "")
        .catch(err => console.log("註冊id失敗", err));
}





