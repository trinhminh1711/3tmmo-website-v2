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

export async function getStatusGroup(since, until, user_id, status, merchant) {
  const res = await axios.get(urls.Order.getStatusOrder, {
    params: { since: since, until: until ,user_id : user_id, status : status  , merchant : merchant},
  });
  return res.data;
}

/*
  `SELECT COUNT(order_id) FROM orders
    WHERE sales_time > "${req.query.since}" AND sales_time < "${req.query.until}"  
    AND utm_source = "${req.query.user_id}" AND order_status = "${req.query.status}" AND merchant = "${req.query.merchant}";`,*/
