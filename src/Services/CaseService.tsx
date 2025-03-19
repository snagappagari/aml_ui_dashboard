import axios from "axios";
import { CASE_MANAGEMANT_URL } from "../commonUtils/ApiConstants";
import { BASE_URL } from "../commonUtils/Base";

class CaseService {
  getAllCases(page: number, size: number) {
    return axios.get(`${BASE_URL + CASE_MANAGEMANT_URL.getAllCases}?page=${page}&size=${size}`);
  }

  getaseById(id: any) {
    return axios.get(`${BASE_URL + CASE_MANAGEMANT_URL.getAllCases}/${id}`);
  }
  caseCount() {
    return axios.get(BASE_URL + CASE_MANAGEMANT_URL.caseCount);
  }
  caseComments(obj: any) {
    return axios.post(BASE_URL + CASE_MANAGEMANT_URL.caseComments, obj);
  }
  // transaction(obj: any) {
  //   return axios.post(BASE_TRANS_URL + TRANSACTION_URL.transaction, obj);
  // }
}

export default new CaseService();