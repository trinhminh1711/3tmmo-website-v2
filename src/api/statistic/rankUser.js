const axios = require("axios").default;
import urls from "../../urls";
export async function getRank(sale_time) {
  const res = await axios.get(urls.Order.getRankIncome, {
    params: { since: sale_time },
  });
  return res.data;
}

export async function getRankTime(since, until) {
  const res = await axios.get(urls.Order.getRankIncomeTime, {
    params: { since: since, until: until },
  });
  return res.data;
}
