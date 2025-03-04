import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import { LOGIN_URL } from "../commonUtils/ApiConstants";

class LoginService {
    async login(obj: any) {
    const response = await axios.post(BASE_URL + LOGIN_URL.login, obj);
    return response.data;
  }
}

export default new LoginService();