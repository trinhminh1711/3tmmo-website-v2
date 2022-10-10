const axios = require("axios").default;
import urls from "../../urls";
export async function addNotification(content, extra_date) {
  const res = axios.post(urls.Notification.add, {
    data: {
      content: content,
      extra_date: extra_date,
    },
  });
  const dataRes = await res;
  return dataRes;
}

export async function getNotification() {
  const res = axios.get(urls.Notification.get);
  const dataRes = await res;
  return dataRes.data;
}

export async function getLastestUpdate() {
  const res = axios.get(urls.Notification.getLastUpdate);
  const dataRes = await res;
  return dataRes.data;
}

export async function deleteNotification(id) {
  const res = axios({
    method: "delete",
    url: urls.Notification.delete,
    data: {
      id: id,
    },
  });
  const dataRes = await res;
  return dataRes.data.delete;
}
