const axios = require("axios").default;
import urls from "../../urls";
export async function getRank(sale_time) {
  const res = await axios.get(urls.Order.getRankIncome, {
    params: { since: sale_time },
  });
  return res.data;
}
export async function getIncomeTime(userId, saleTime, endTime) {
  const res = await axios.get(urls.Order.getIncomeTime, {
    params: { userId: userId, since: saleTime, until: endTime },
  });
  if (res.data[0]["SUM(reality_commission)"] == null) {
    return 0;
  }
  return res.data[0]["SUM(reality_commission)"];
}
