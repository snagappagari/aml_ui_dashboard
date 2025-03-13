import axios from "axios";
import { CUSTOMER_MANAGEMENT_URL } from "../commonUtils/ApiConstants";
import { BASE_URL } from "../commonUtils/Base";

class CustomerManagementService {

    getAllTransactionsSummary(obj: any) {
        return axios.post(BASE_URL + CUSTOMER_MANAGEMENT_URL.getAllTransactionBasedOnIp, obj);
    }
}

export default new CustomerManagementService();