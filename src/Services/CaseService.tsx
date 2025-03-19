import axios from "axios";
import { CASE_MANAGEMANT_URL, CASE_URL } from "../commonUtils/ApiConstants";
<<<<<<< HEAD
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
=======

class CaseService {
>>>>>>> b99809e7b0c158b76e025dcf81d55776248f6b4d
  async login(obj: any) {
    const response = await axios.post(BASE_URL + CASE_URL.createcase, obj);
    return response.data;
  }
<<<<<<< HEAD
  // transaction(obj: any) {
  //   return axios.post(BASE_TRANS_URL + TRANSACTION_URL.transaction, obj);
  // }
=======
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
>>>>>>> b99809e7b0c158b76e025dcf81d55776248f6b4d
}

export default new CaseService()

