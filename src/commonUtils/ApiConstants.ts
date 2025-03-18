export const LOGIN_URL = {
  login: "/api/v1/auth/login",
  getlatlogin: "/api/v1/users/details"
};

export const ALERT_URL = {
  getAllAlerts: "/api/v1/alerts?",
  getAlertCount: "/api/v1/alerts/count",
  getAlertById: "/api/v1/alerts/",
  getAlertLocation: "/api/v1/alerts/count-by-location"
};

export const TRANSACTION_URL = {
  getAllTransactions: "/api/v1/transactions",
  getAllTransactionsSummary: "/api/v1/transactions/summary",
  transaction: "/api/v1/aml/post-transaction"
}


export const CUSTOMER_MANAGEMENT_URL = {
  getAllTransactionBasedOnIp: "/api/v1/query/execute",


}

export const CASE_URL = {
  createcase: "/api/v1/cases"
}