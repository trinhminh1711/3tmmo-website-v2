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
export async function updatePartner(id, name, name_public, link, commission, sign, percentage) {
  const res = axios({
    method: "post",
    url: urls.Partner.update,
    data: {
      partner_id : id ,
      name: name,
      name_public : name_public,
      link: link,
      unit_price: parseInt(commission),
      sign: sign,
      percentage: percentage,
    },
  });
  const dataRes = await res;
  return dataRes;
}

export async function deletePartner(partner_id) {
  const res = axios({
    method: "delete",
    url: urls.Partner.delete,
    data: {
     partner_id: partner_id,
    },
  });
  const dataRes = await res;
  return dataRes.data;
}

export async function addPartner(name , name_public, link, unit_price, sign, percentage) {
console.log("abc");
  const res = axios.post(urls.Partner.add, {
    data: {
      name: name,
      name_public : name_public,
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
