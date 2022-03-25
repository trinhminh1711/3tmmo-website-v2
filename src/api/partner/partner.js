const axios = require("axios").default;
import * as func from "../../function/converIdUser";
import urls from "../../urls";
import * as tokenVaid from "../../function/logout";
export async function getPartner() {
  const res = axios.get(urls.Partner.master);
  const dataRes = await res;
  dataRes.data.forEach((partner) => {
    partner.link = partner.link.replaceAll(
      "user001",
      func.convertId(sessionStorage.getItem("IdUser"))
    );
    partner.redirect_link =
      "http://3tmmo.com:3000/redirect/" +
      partner.parent_id +
      "/" +
      func.convertId(sessionStorage.getItem("IdUser"));
  });
  return dataRes.data;
}
export async function updatePartner(name, link, commission, sign, percentage) {
  const res = axios({
    method: "post",
    url: urls.Partner.update,
    data: {
      name: name,
      link: link,
      unit_price: parseInt(commission),
      sign: sign,
      percentage: percentage,
    },
  });
  const dataRes = await res;
  return dataRes;
}

export async function deletePartner(name) {
  const res = axios({
    method: "delete",
    url: urls.Partner.delete,
    data: {
      name: name,
    },
  });
  const dataRes = await res;
  return dataRes.data;
}

export async function addPartner(name, link, unit_price, sign, percentage) {
  const res = axios.post(urls.Partner.add, {
    data: {
      name: name,
      link: link,
      unit_price: unit_price,
      sign: sign,
      percentage: percentage,
    },
  });
  const dataRes = await res;
  if (dataRes.data == "Invalid token") {
    alert("Phiên đăng nhập hết hạn");
    tokenVaid.logout();
  } else {
    return dataRes;
  }
}
