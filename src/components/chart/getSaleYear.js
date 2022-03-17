import * as order from "../../api/statistic/order";
import * as convertId from "../../function/converIdUser";
export async function getSalesYear() {
    const present = new Date();
    const presentMonth = present.getMonth() + 1;
    var arrIncome = [];
    for (let i = 0; i < presentMonth; i++) {
      const sumMonth = await getSalesOnMonth(i);
      arrIncome.push(sumMonth);
    }
    return (arrIncome);
    
}

async function getSalesOnMonth(month) {
    const sinceDate = new Date();
    const untilDate = new Date();
    sinceDate.setHours(7, 0, 0, 0);
    untilDate.setHours(30, 59, 59, 0);
    sinceDate.setDate(sinceDate.getDate() - 0);
    untilDate.setDate(untilDate.getDate() - 0);
    sinceDate.setMonth(month);
    untilDate.setMonth(month + 1);
    const since = sinceDate.toISOString();
    const until = untilDate.toISOString();
    const arrayRes = await order.getOrders(
      since,
      until,
      convertId.convertId(sessionStorage.getItem("IdUser"))
    );
    var total = 0;
    for (let i = 0; i < arrayRes.length; i++) {
      if (arrayRes[i].status == "Tạm duyệt") {
        total = total + arrayRes[i].commission;
      }
    }
    return total;
}