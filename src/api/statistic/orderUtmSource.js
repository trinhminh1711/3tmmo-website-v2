const axios = require('axios').default;
import urls from '../../urls';
import * as partner from '../partner/partner'
export async function getOrders(since, until, idUser) {
    var arrayOrder = [
    ]
    const param =
    {
        since: since,
        until: until,
        utm_source: idUser
    }
    const res = axios.get(
        urls.Order.getAllOrder,
        {
            params: param,
            headers: {
                'Authorization': 'Token 2VF0SzupbirF99M0p2q1f6gDARixFme3',
                "Content-Type": "application/json",

            }
        },
    )
    const listPartner = await (partner.getPartner());

    const dataRes = await (res);
    var total_page = dataRes.data.total_page;
    var getAll = [];
    for (let i = 1; i <= total_page; i = i + 2) {
        let j = i + 1;
        const page = await getOrdersOnePage(since, until, idUser, i);
        const page_next = await getOrdersOnePage(since, until, idUser, j);
        getAll = getAll.concat(page.concat(page_next));

    }
    (getAll).forEach(element => {
        arrayOrder.push({
            sales_time: element.sales_time,
            merchant: element.merchant,
            status: element.status,
            commission: element.commission/ 2,
            idUser: element.idUser
        })
    });

    for (let i = 0; i < arrayOrder.length; i++) {

        for (let j = 0; j < listPartner.length; j++) {
            if (arrayOrder[i].merchant == listPartner[j].name) {
                arrayOrder[i].commission = listPartner[j].unit_price;
            }

        }
    }
    var totalIncom = 0;
    for (let k = 0; k < arrayOrder.length; k++) {
        if (arrayOrder[k].status == "Tạm duyệt") {
            totalIncom = totalIncom + arrayOrder[k].commission;
        }

    }
    return (totalIncom);
}

export async function getOrdersOnePage(since, until, idUser, page) {
    var arrayOrder = [
    ]
    const param =
    {
        since: since,
        until: until,
        utm_source: idUser,
        page: page
    }
    const res = axios.get(
        urls.Order.getAllOrder,
        {
            params: param,
            headers: {
                'Authorization': 'Token 2VF0SzupbirF99M0p2q1f6gDARixFme3',
                "Content-Type": "application/json",

            }
        },
    )
    const dataRes = await (res);
    (dataRes.data.data).forEach(element => {
        arrayOrder.push({
            sales_time: element.sales_time,
            merchant: element.merchant,
            status: element.products[0].status,
            commission: element.pub_commission / 2,
            idUser: element.utm_source

        })
    });
    function splitDate(dateT) {
        var dateFormat = dateT.split("T");
        return "" + dateFormat[0] + " || " + dateFormat[1];

    }
    arrayOrder = arrayOrder.map(item => {
        item["sales_time"] = splitDate(item.sales_time)
        if (item.status == 0)
            item["status"] = "Chờ xử lý";
        else if (item.status == 1) {
            item["status"] = "Tạm duyệt";
        }
        else {
            item["status"] = "Đã hủy";
        }
        return item;
    });
    const partnerRes = await partner.getPartner();
    for (let i = 0; i < arrayOrder.length; i++) {
        for (let j = 0; j < partnerRes.length; j++) {
            if (arrayOrder[i].merchant == partnerRes[j].name) {
                arrayOrder[i].commission = partnerRes[j].unit_price;
            }
        }
    }

    return (arrayOrder);

}

