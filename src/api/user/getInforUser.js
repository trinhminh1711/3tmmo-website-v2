const axios = require('axios').default;
import * as tokenVaid from "../../function/logout";
import urls from '../../urls';
export async function getInfoUser(idUser) {
    const res = axios.get(
        urls.User.getById + idUser,
        {
            headers: {
                'Authorization': 'Beaer '+ sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        }
    );
    const dataRes = await (res);
    if(dataRes.data == 'Invalid token')
    {
        tokenVaid.logout();
    }
    else
    {
        if(dataRes.data.role == "0")
        {
            dataRes.data.role = "admin"
        }
        else
        {
            dataRes.data.role = "user"
        }
        return(dataRes)
    }
}