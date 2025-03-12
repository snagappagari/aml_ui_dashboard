import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import { TRANSACTION_URL } from "../commonUtils/ApiConstants";

class TrasactionsService {
  getAllTrasactions(page: number, size: number) {
    return axios.get(`${BASE_URL + TRANSACTION_URL.getAllTransactions}?page=${page}&size=${size}`);
  }

  getTrasactionById(id: any) {
    return axios.get(`${BASE_URL + TRANSACTION_URL.getAllTransactions}/${id}`);
  }
  getAllTransactionsSummary() {
    return axios.get(BASE_URL + TRANSACTION_URL.getAllTransactionsSummary);
  }
}

export default new TrasactionsService();