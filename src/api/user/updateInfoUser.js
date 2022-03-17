const axios = require('axios').default;
import * as tokenVaid from "../../function/logout";
import urls from '../../urls';
export async function changeInfo(id, name, birthday, sex, bank_account_name, bank_account_number, bank_name) {
    const res = axios.post(
        urls.User.updateInfo + id,
        {
            headers: {
                'Authorization': 'Beaer ' + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                birthday: birthday,
                sex: sex,
                bank_account_name: bank_account_name,
                bank_account_number: bank_account_number,
                bank_name: bank_name
            },

        }
    );
    const dataRes = await (res);
    if (dataRes.data == 'Invalid token') {
        alert("Phiên đăng nhập hết hạn");
        tokenVaid.logout();
    }
    else {
       return dataRes.data.update;
    }
}