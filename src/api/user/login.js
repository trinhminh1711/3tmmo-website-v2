const axios = require("axios").default;
import urls from "../../urls";
export async function login(usrName, pass) {
  const res = axios.post(urls.Login.master, {
    username: usrName,
    password: pass,
  });
  const dataRes = await res;
  if (dataRes.data.login) {
    sessionStorage.clear();
    sessionStorage.setItem("token", dataRes.data.token);
    sessionStorage.setItem("IdUser", dataRes.data.idUser);
    sessionStorage.setItem("loginStatus", 1);
    sessionStorage.getItem("IdUser");
    return true;
  }
  return false;
}
