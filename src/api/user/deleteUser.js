const axios = require('axios').default;
import urls from '../../urls';
export async function deleteUser(id) {
    const res = axios({
        method: 'delete',
        url: urls.User.deleteUser+id,
    });
    const dataRes = await (res);
    return dataRes.data;
}
