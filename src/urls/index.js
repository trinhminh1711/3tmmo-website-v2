const urls = {
  Login: {
    master: "http://103.57.222.77:3000/login",
  },
  Register: {
    master: "http://103.57.222.77:3000/customers",
  },
  Account :{
    master : "http://103.57.222.77:3000/accountkey",
    deleteAccount : "http://103.57.222.77:3000/delete/accountkey",
    addAccount : "http://103.57.222.77:3000/add/accountkey"
  },
  User: {
    getById: "http://103.57.222.77:3000/customers/",
    addUser: "http://103.57.222.77:3000/customers/",
    password: "http://103.57.222.77:3000/password/",
    updatePassword: "http://103.57.222.77:3000/update/password/",
    posterity: "http://103.57.222.77:3000/posterity",
    updateInfo: "http://103.57.222.77:3000/update/info/customers/",
    permission: "http://103.57.222.77:3000/permission/",
    getIdUser: "http://103.57.222.77:3000/userid",
    getAllUser: "http://103.57.222.77:3000/listuser",
    deleteUser: "http://103.57.222.77:3000/delete/user/",
  },
  Partner: {
    master: "http://103.57.222.77:3000/partner",
    update: "http://103.57.222.77:3000/update/partner",
    add: "http://103.57.222.77:3000/add/partner",
    delete: "http://103.57.222.77:3000/delete/partner",
  },
  Notification: {
    add: "http://103.57.222.77:3000/add/notifications",
    get: "http://103.57.222.77:3000/get/notifications",
    getLastUpdate: "http://103.57.222.77:3000/getlastest/notifications",
    delete: "http://103.57.222.77:3000/delete/notifications",
  },
  Order: {
    getAllOrder: "https://api.accesstrade.vn/v1/orders",
    getOrderUser: "http://103.57.222.77:3000/order/user",
    getOrderGroup: "http://103.57.222.77:3000/order/group",
    getOrderMerchant : "http://103.57.222.77:3000/order/merchant",
    getStatusOrder: "http://103.57.222.77:3000/status/order",
    getIncome: "http://103.57.222.77:3000/income/user",
    getIncomeTime: "http://103.57.222.77:3000/income/time/user",
    getRankIncome: "http://103.57.222.77:3000/rank/user",
    getRankIncomeTime: "http://103.57.222.77:3000/rank/time/user",
  },
  Campaign: {
    getAllCampaign: "https://api.accesstrade.vn/v1/campaigns",
  },
  Transactions: {
    getAllTransactions: "https://api.accesstrade.vn/v1/transactions",
  },
};
export default urls;
