const axios = require('axios').default;
import urls from '../../urls';
export async function getCampaigns(page) {

    const param =
    {
        page: page
    }
    const res = axios.get(
        urls.Campaign.getAllCampaign,
        {
            params: param,
            headers: {
                'Authorization': 'Token 2VF0SzupbirF99M0p2q1f6gDARixFme3',
                "Content-Type": "application/json",

            }
        },
    )
    const dataRes = await (res);
    for(let i=0;i<dataRes.data.data.length;i++)
    {
        if (dataRes.data.data[i].status == 1)
        {
            dataRes.data.data[i].status = "Đang chạy";
            dataRes.data.data[i].start_time = converDate(dataRes.data.data[i].start_time);
        }
    }
    return(dataRes.data.data);
}
function converDate(date)
{
    return date.split("T")[0];
}
