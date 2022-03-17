const axios = require('axios').default;
import urls from '../../urls';
export async function Register(username, password, name, birthday, sex, sub_district, district, city, bank_account_name, bank_account_number, bank_name, idParent) {

    var data = {
        "userName": username,
        "name": name,
        "passWord": password,
        "birthday": birthday,
        "sex": sex,
        "sub_district": sub_district,
        "district": district,
        "city": city,
        "bank_account_name": bank_account_name,
        "bank_account_number": bank_account_number,
        "bank_name": bank_name,
        "id_parent": idParent,

    }
    const res = axios.post(
        urls.Register.master,
        {
            data: data,

        },
    );
    const dataRes = await (res);
    return(dataRes.data);

}

