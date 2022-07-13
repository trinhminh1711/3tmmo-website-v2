const urls = {
  Login: {
    master: "http://localhost:3000/login",
  },
  Register: {
    master: "http://localhost:3000/customers",
  },
  Account :{
    master : "http://localhost:3000/accountkey",
    deleteAccount : "http://localhost:3000/delete/accountkey",
    addAccount : "http://localhost:3000/add/accountkey"
  },
  User: {
    getById: "http://localhost:3000/customers/",
    addUser: "http://localhost:3000/customers/",
    password: "http://localhost:3000/password/",
    updatePassword: "http://localhost:3000/update/password/",
    posterity: "http://localhost:3000/posterity",
    updateInfo: "http://localhost:3000/update/info/customers/",
    permission: "http://localhost:3000/permission/",
    getIdUser: "http://localhost:3000/userid",
    getAllUser: "http://localhost:3000/listuser",
    deleteUser: "http://localhost:3000/delete/user/",
  },
  Partner: {
    master: "http://localhost:3000/partner",
    update: "http://localhost:3000/update/partner",
    add: "http://localhost:3000/add/partner",
    delete: "http://localhost:3000/delete/partner",
  },
  Notification: {
    add: "http://localhost:3000/add/notifications",
    get: "http://localhost:3000/get/notifications",
    getLastUpdate: "http://localhost:3000/getlastest/notifications",
    delete: "http://localhost:3000/delete/notifications",
  },
  Order: {
    getAllOrder: "https://api.accesstrade.vn/v1/orders",
    getOrderUser: "http://localhost:3000/order/user",
    getOrderGroup: "http://localhost:3000/order/group",
    getOrderExport: "http://localhost:3000/order/export",
    getOrderMerchant : "http://localhost:3000/order/merchant",
    getOrderAllGroupSuccess : "http://localhost:3000/order/all-group",
    getOrderAllMerchant : 'http://localhost:3000/order/all-merchant',
    getStatusOrder: "http://localhost:3000/status/order",
    getIncome: "http://localhost:3000/income/user",
    getIncomeTime: "http://localhost:3000/income/time/user",
    getRankIncome: "http://localhost:3000/rank/user",
    getRankIncomeTime: "http://localhost:3000/rank/time/user",
  },
  Campaign: {
    getAllCampaign: "https://api.accesstrade.vn/v1/campaigns",
  },
  Transactions: {
    getAllTransactions: "https://api.accesstrade.vn/v1/transactions",
  },
};
export default urls;
