const axios = require('axios').default;
import urls from '../../urls';
export async function getTransactions(sinceDate, untilDate, page , selectUser) {

    const param =
    {
        since: sinceDate,
        until: untilDate,
        utm_source : selectUser,
        page: page,
    }
    const res = axios.get(
        urls.Transactions.getAllTransactions,
        {
            params: param,
            headers: {
                'Authorization': 'Token 2VF0SzupbirF99M0p2q1f6gDARixFme3',
                "Content-Type": "application/json",

            }
        },
    )
    const dataRes = await (res);

    for (let i = 0; i < dataRes.data.data.length; i++) {
        dataRes.data.data[i].click_time = converDate(dataRes.data.data[i].click_time);
        if (dataRes.data.data[i].status == 1) {
            dataRes.data.data[i].status = "Đã duyệt";
        }
        else {
            dataRes.data.data[i].status = "Chưa duyệt";
        }
    }

    return (dataRes.data);
}

function converDate(date) {
    return date.split("T")[0] +"  ||  "+ date.split("T")[1];
}

