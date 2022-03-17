const axios = require('axios').default;
import urls from '../urls';
export async function checkPermission() {
    const res = axios({
        method: 'get',
        url: urls.User.permission + sessionStorage.getItem("IdUser"),
    });
    const dataRes = await (res);
    return dataRes.data.role[0].role;
}
