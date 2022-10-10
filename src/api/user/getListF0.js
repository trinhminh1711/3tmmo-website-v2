const axios = require("axios").default;
import * as func from "../../function/converIdUser";
import urls from "../../urls";

export async function getListChildUser(idUser) {
  const res = await axios.get(urls.User.posterity, { params: { id: idUser } });
  return res.data;
}

export async function getAllUser() {
  const res = await axios.get(urls.User.getAllUser);
  return res.data;
}

export async function getPosterity(idUser, sinceTime, untilTime) {
  const res = await axios.get(urls.User.posterity, { params: { id: idUser } });
  const promises = [];
  res.data.map(async (user) => {
    const value = getIncomeYear(user, sinceTime, untilTime);
    promises.push(value);
  });
  return Promise.all(promises);
}

async function getIncomeYear(user, sinceTime, untilTime) {
  const incomeYear = await axios.get(urls.Order.getIncome, {
    params: {
      idUser: func.convertId(user.user_id),
      since: sinceTime,
      until: untilTime,
    },
  });
  var userFull = {};
  userFull.name = user.name;
  userFull.username = user.username;
  userFull.id = func.convertId(user.user_id);
  if (incomeYear.data[0]["SUM(pub_commission)"] == null) {
    userFull.pub_commission = 0;
  } else {
    userFull.pub_commission = incomeYear.data[0]["SUM(pub_commission)"];
  }
  if (incomeYear.data[0]["SUM(pub_commission)"] == null) {
    userFull.reality_commission = 0;
    userFull.sharing = 0;
  } else {
    userFull.reality_commission = incomeYear.data[0]["SUM(reality_commission)"]
    userFull.sharing = ((incomeYear.data[0]["SUM(reality_commission)"] * 10) / 100);
  }
  return userFull;
}
