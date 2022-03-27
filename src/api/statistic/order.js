const axios = require("axios").default;
import urls from "../../urls";
export async function getOrderUser(id, since, until) {
  const res = await axios.get(urls.Order.getOrderUser, {
    params: { idUser: id, since: since, until: until },
  });
  return res.data;
}
export async function getOrderGroupUser(id, since, until) {
  const res = await axios.get(urls.Order.getOrderGroup, {
    params: { idUser: id, since: since, until: until },
  });
  return res.data;
}

