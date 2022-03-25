const axios = require("axios").default;
import * as func from "../../function/converIdUser";
import urls from "../../urls";
export async function getPosterity(idUser) {
  const res = await axios.get(urls.User.posterity, { params: { id: idUser } });
  const promises = [];
  res.data.map(async (user) => {
    const value = getIncomeYear(user);
    promises.push(value);
  });
  return Promise.all(promises);
}

async function getIncomeYear(user) {
  const year = new Date().getFullYear();
  var currentYear = new Date(year, 0, 1);
  currentYear.setHours(7, 0, 0, 0);
  const incomeYear = await axios.get(urls.Order.getIncomeYear, {
    params: {
      idUser: func.convertId(user.user_id),
      since: currentYear.toISOString(),
    },
  });
  var userFull = {};
  userFull.name = user.name;
  userFull.username = user.username;
  userFull.id = func.convertId(user.user_id);
  userFull.pub_commission = incomeYear.data[0]["SUM(reality_commission)"];
  return userFull;
}
