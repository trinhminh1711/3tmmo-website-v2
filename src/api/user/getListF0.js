const axios = require('axios').default;
import * as convertId from "../../function/converIdUser";
import urls from '../../urls';
import * as orderUtmSource from "../statistic/orderUtmSource";
export async function getPosterity(idUser) {

    const res = axios.get(
        urls.User.posterity + idUser,
    );
    const sinceDate = new Date();
    const untilDate = new Date();
    sinceDate.setHours(7, 0, 0, 0);
    untilDate.setHours(30, 59, 59, 0);
    sinceDate.setDate(sinceDate.getDate() - 30);
    untilDate.setDate(untilDate.getDate() - 0);
    const since = sinceDate.toISOString();
    const until = untilDate.toISOString();
    const dataRes = await (res);
    for (let i = 0; i < dataRes.data.length; i++) {
        dataRes.data[i].user_id = convertId.convertId(dataRes.data[i].user_id);
    }
    var newData = [];
    newData = dataRes.data;
    var dataUtmSource = [];
    for (let j = 0; j < newData.length; j++) {
        var objUtmSource = {};
        objUtmSource["id"] = newData[j].user_id;
        objUtmSource["username"] = newData[j].username;
        var income_usr = await orderUtmSource.getOrders(since, until, newData[j].user_id);
        objUtmSource["inCome"] = income_usr.toLocaleString('de-DE', { style: 'currency', currency: 'VND' });
        objUtmSource["sharing"] = (income_usr * 10 / 100).toLocaleString('de-DE', { style: 'currency', currency: 'VND' });
        objUtmSource["rate"] = "10%";
        dataUtmSource.push(objUtmSource);
    }
    return dataUtmSource;
}
