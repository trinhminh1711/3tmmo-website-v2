const axios = require("axios").default;
import * as tokenVaid from "../../function/logout";
import urls from "../../urls";
import * as func from "../../function/converIdUser";
export async function getAllUser() {
  const res = axios.get(urls.User.getAllUser, {
    headers: {
      Authorization: "Beaer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  const dataRes = await res;
  if (dataRes.data == "Invalid token") {
    tokenVaid.logout();
  } else {
    console.log(dataRes);
    var arrTotalUser = [];
    for (let i = 0; i < dataRes.data.length; i++) {
      const objUser = {
        id: "",
        id_convert: "",
        username: "",
        totalValue: 0,
        name: "",
        password: "",
        parent_id: "",
        bank_name: "",
        bank_account_name: "",
        bank_account_number: "",
        birthday: "",
        city: "",
        district: "",
        sub_district: "",
        sex: "",
        role: "",
      };
      objUser.id = dataRes.data[i].user_id;
      objUser.username = dataRes.data[i].username;
      objUser.password = dataRes.data[i].password;
      objUser.name = dataRes.data[i].name;
      objUser.bank_account_name = dataRes.data[i].bank_account_name;
      objUser.bank_account_number = dataRes.data[i].bank_account_number;
      objUser.bank_name = dataRes.data[i].bank_name;
      objUser.birthday = dataRes.data[i].birthday;
      objUser.id_convert = func.convertId(dataRes.data[i].user_id);
      objUser.city = dataRes.data[i].city;
      objUser.sex = dataRes.data[i].sex;
      objUser.district = dataRes.data[i].district;
      objUser.sub_district = dataRes.data[i].sub_district;
      objUser.parent_id = dataRes.data[i].parent_id;
      objUser.role = convertRoles(dataRes.data[i].role);
      arrTotalUser.push(objUser);
    }
    return arrTotalUser;
  }
}

function convertRoles(role) {
  if (role == 0) {
    return "admin";
  } else {
    return "user";
  }
}
