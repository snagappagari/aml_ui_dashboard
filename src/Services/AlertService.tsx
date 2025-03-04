import { BASE_URL } from "../commonUtils/Base";
import axios from "axios";
import { ALERT_URL } from "../commonUtils/ApiConstants";

class AlertService {

  // getAllAlerts() {
  //   return axios.get(BASE_URL + ALERT_URL.getAllAlerts);
  // }
  getAllAlerts(page = 0, size = 7) {
    return axios.get(`${BASE_URL}${ALERT_URL.getAllAlerts}?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(response => response.data);
  }
  // getAlertCount() {
  //   return axios.get(BASE_URL + ALERT_URL.getAlertCount);
  // }
  getAlertCount() {
    return axios.get(BASE_URL + ALERT_URL.getAlertCount, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(response => response.data);
  }
  

  getAlertById(alertId: string) {
    return axios.get(BASE_URL + ALERT_URL.getAlertById + alertId);
  }
}

export default new AlertService();