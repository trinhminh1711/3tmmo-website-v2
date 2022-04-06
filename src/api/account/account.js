const axios = require("axios").default;
import urls from "../../urls";
export async function getAccount() {
  const res = await axios.get(urls.Account.master);
  return res.data;
}

export async function addAccount(APIkey , username) {
  const res = await axios.post(urls.Account.addAccount, {
    params: { APIkey: APIkey , username : username },
  });
  return res.data;
}

export async function deleteAccount(id) {
  const res = await axios.get(urls.Account.deleteAccount, {
    params: { account_id: id },
  });
  return res.data;
}
