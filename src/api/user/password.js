const axios = require('axios').default;
import * as tokenVaid from "../../function/logout";
import urls from '../../urls';
var md5 = require('md5');
export async function changePassword(id, oldPassword) {
    const res = axios.post(
        urls.User.password + id,
        {
            headers: {
                'Authorization': 'Beaer ' + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        }
    );
    const dataRes = await (res);
    if (dataRes.data == 'Invalid token') {
        alert("Phiên đăng nhập hết hạn");
        tokenVaid.logout();
    }
    else {
        if (dataRes.data[0].password == md5(oldPassword)) {
            return true;
        }
        else {
            return false
        }
    }
}
export async function updatePassword(id, newPassword) {
    console.log(newPassword);
    const res = axios.post(
        urls.User.updatePassword + id + "/" + md5(newPassword),
        {
            headers: {
                'Authorization': 'Beaer ' + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            }
        }
    );
    const dataRes = await (res);
    if (dataRes.data == 'Invalid token') {
        alert("Phiên đăng nhập hết hạn");
        tokenVaid.logout();
        return false
    }
    else {
        return true;
    }

}