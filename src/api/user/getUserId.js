const axios = require('axios').default;
import * as tokenVaid from "../../function/logout";
import urls from '../../urls';
import * as func from '../../function/converIdUser'
export async function getUserId() {
    const res = axios.get(
        urls.User.getIdUser,
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
        var arrId =[];
        for(let i=0;i<dataRes.data.length ; i++)
        {
            arrId.push(func.convertId(dataRes.data[i].user_id));
        }
        return(arrId)
    }
}