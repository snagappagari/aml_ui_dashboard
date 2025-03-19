import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import { CASE_MANAGEMANT_URL, CASE_URL } from "../commonUtils/ApiConstants";

class CaseService {
  async login(obj: any) {
    const response = await axios.post(BASE_URL + CASE_URL.createcase, obj);
    return response.data;
  }
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
}

export default new CaseService();