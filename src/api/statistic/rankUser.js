const axios = require("axios").default;
import urls from "../../urls";
export async function getRank(sinceTime , untilTime) {
  const res = await axios.get(urls.Order.getRankIncome, {
    params: { since: sinceTime , until : untilTime },
  });
  return res.data;
}

export async function getRankTime(since, until) {
  const res = await axios.get(urls.Order.getRankIncomeTime, {
    params: { since: since, until: until },
  });
  return res.data;
}
