import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import {  TRANSACTION_URL } from "../commonUtils/ApiConstants";

class TrasactionsService {
    getAllTrasactions() {
        return axios.get(BASE_URL +TRANSACTION_URL.getAllTransactions);
      }
}

export default new TrasactionsService();