import { REPORTS_URL } from "../commonUtils/ApiConstants";
import { BASE_REPORTS_URL } from "../commonUtils/Base";
import axios from "axios";

class ReportsService {
    getRiskAssessment(startDate: string, endDate: string,limit:number) {
        return axios.get(`${BASE_REPORTS_URL+ REPORTS_URL.getgetRiskAssessment}start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
    
      // Fraud Detection
      getFraudDetection(startDate: string, endDate: string,limit:number) {
        return axios.get(`${BASE_REPORTS_URL}/fraud_detection?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
    
      // Customer Segmentation
      getCustomerSegmentation(startDate: string, endDate: string, limit: number) {
        return axios.get(`${BASE_REPORTS_URL}/customer_segmentation?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
    
      // Forecast Transaction Volume
      getForecastTransactionVolume(startDate: string, endDate: string,limit:number) {
        return axios.get(`${BASE_REPORTS_URL}/forecast_transaction_volume?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
    
      // Predict Amount
      getPredictAmount(startDate: string, endDate: string, limit: number) {
        return axios.get(`${BASE_REPORTS_URL}/predict_amount?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
    
      // Revenue Impact Analysis
      getRevenueImpactAnalysis(startDate: string, endDate: string, limit:number) {
        return axios.get(`${BASE_REPORTS_URL}/revenue_impact_analysis?start_date=${startDate}&end_date=${endDate}&limit=${limit}`,
          {
            responseType: 'blob', // Ensure the response is treated as a file (binary data)
          }
        );
      }
}

export default new ReportsService();