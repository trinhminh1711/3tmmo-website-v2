const axios = require('axios').default;
export async function getPartner() {
    const res = axios.get(
        "http://localhost:3000/redirect",
    );
    const dataRes = await (res);
    console.log(dataRes);
}