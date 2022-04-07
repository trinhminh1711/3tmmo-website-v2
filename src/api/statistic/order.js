const axios = require("axios").default;
import urls from "../../urls";
export async function getOrderUser(id, since, until) {
  const res = await axios.get(urls.Order.getOrderUser, {
    params: { idUser: id, since: since, until: until },
  });

  return res.data;
}

export async function getOrderMerchant(id, since, until , merchant) {
  const res = await axios.get(urls.Order.getOrderMerchant, {
    params: { idUser: id, since: since, until: until  , merchant : merchant },
  });

  return res.data;
}

export async function getOrderGroupUser(id, since, until) {
  const res = await axios.get(urls.Order.getOrderGroup, {
    params: { idUser: id, since: since, until: until },
  });
  const promises = [];
  res.data.map(async (orderGroup) => {
    const value = getStatusGroup(orderGroup, since, until, id);
    promises.push(value);
  });
  return Promise.all(promises);
}

export async function getStatusGroup(orderGroup, since, until, user_id) {
  const resPending = await axios.get(urls.Order.getStatusOrder, {
    params: {
      since: since,
      until: until,
      user_id: user_id,
      status: "0",
      merchant: orderGroup.merchant,
    },
  });
  const resApproved = await axios.get(urls.Order.getStatusOrder, {
    params: {
      since: since,
      until: until,
      user_id: user_id,
      status: "1",
      merchant: orderGroup.merchant,
    },
  });
  const resRejected = await axios.get(urls.Order.getStatusOrder, {
    params: {
      since: since,
      until: until,
      user_id: user_id,
      status: "2",
      merchant: orderGroup.merchant,
    },
  });
  var orderFull = {};
  orderFull.merchant = orderGroup.merchant;
  orderFull.utm_source = orderGroup.utm_source;
  if (resApproved.data[0] != null) {
    orderFull.sum = resApproved.data[0][
      "SUM(reality_commission)"
    ]
    orderFull.sumNumber = resApproved.data[0]["SUM(reality_commission)"];
  } else {
    orderFull.sum = 0;
    orderFull.sumNumber = 0;
  }
  orderFull.countTotal = orderGroup["COUNT(order_id)"];
  orderFull.pending = resPending.data[0]["COUNT(order_id)"];
  orderFull.approved = resApproved.data[0]["COUNT(order_id)"];
  orderFull.rejected = resRejected.data[0]["COUNT(order_id)"];
  return orderFull;
}
