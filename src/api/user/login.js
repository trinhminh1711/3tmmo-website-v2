const axios = require('axios').default;
import urls from '../../urls';
export async function login(usrName, pass) {
    var data = {
        "username": usrName,
        "password": pass
    }
    const res = axios.post(
        urls.Login.master,
        {
            data: data,

        },
    );
    const dataRes = await (res);
    if (dataRes.data.login) {
        sessionStorage.clear();
        sessionStorage.setItem('token', dataRes.data.token);
        sessionStorage.setItem('IdUser', dataRes.data.idUser[0].user_id);
        sessionStorage.setItem('loginStatus', 1);
        sessionStorage.getItem("IdUser")
        console.log(sessionStorage.getItem("IdUser"));
        return true;
    }
    return false;

}