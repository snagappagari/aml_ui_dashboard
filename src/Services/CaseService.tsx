import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import { CASE_URL } from "../commonUtils/ApiConstants";

class CaseService {
    async login(obj: any) {
    const response = await axios.post(BASE_URL + CASE_URL.createcase, obj);
    return response.data;
  }
}

export default new CaseService();