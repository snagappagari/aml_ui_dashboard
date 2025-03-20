import React, { useState } from 'react';
import ReportsService from '../../Services/ReportsService';

interface ReportData {
  [key: string]: any;
}

interface ReportConfig {
  id: string;
  title: string;
  description: string;
  serviceMethod: (startDate: string, endDate: string, limit: number) => Promise<any>;
}

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<{ [key: string]: ReportData[] }>({});
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [limit, setLimit] = useState<string>('100');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Get current date in YYYY-MM-DD format for max date attribute
  const today = new Date().toISOString().split('T')[0];

  const reportConfigs: ReportConfig[] = [
    {
      id: 'revenue_impact_analysis',
      title: 'Revenue Impact Analysis Report',
      description: `The report predicts how transaction fees contribute to revenue. 
                    Analyzes amount, fee, transaction_type, transaction_direction, status, and merchant_category.
                    ML models - XGBoost and Random Forest Regression for interpretability and accuracy. 
                    Helps financial institutions optimize fee structures to maximize revenue generation.`,
      serviceMethod: ReportsService.getRevenueImpactAnalysis
    },
    {
      id: 'fraud_detection',
      title: 'Fraud Detection Report',
      description: `The report detects the suspicious or fraudulent transactions based on past patterns.
                    Uses variables like amount, customer_id, merchant_category, region, city, country, transaction_direction, transaction_type, status, and fee.
                    ML Models - Random Forest and XGBoost for interpretability, MLP for deep pattern recognition.
                    Identifies high-risk transactions before completion, reducing financial losses and enhancing security.`,
      serviceMethod: ReportsService.getFraudDetection
    },
    {
      id: 'customer_segmentation',
      title: 'Customer Segmentation Report',
      description: `The report identifies the customer spending behavior and creates user segments.
                    Analyzes transaction_amount, merchant_category, region, transaction_type, and transaction_direction.
                    ML Models - Combines XGBoost/Random Forest for feature importance and KMeans clustering for segmentation.
                    Helps banks provide personalized offers, identify high-risk customers, and improve retention strategies.`,
      serviceMethod: ReportsService.getCustomerSegmentation
    },
    {
      id: 'forecast_transaction_volume',
      title: 'Forecast Transactions Report',
      description: `The report predicts the number of transactions for future time periods.
                    Uses transaction_timestamp, transaction_type, region, merchant_category, and status.
                    ML Models - XGBoost for explainability and MLP for deep learning on time series data.
                    Assists banks in workforce optimization and network bandwidth allocation by predicting transaction volumes.`,
      serviceMethod: ReportsService.getForecastTransactionVolume
    },
    {
      id: 'predict_amount',
      title: 'Predict Amount Report',
      description: `The report predicts the transaction amount a customer is likely to spend.
                    Includes customer_id, merchant_category, region, transaction_type, transaction_direction, fee, status, time_of_day, day_of_week, and month.
                    ML Models - XGBoost and Random Forest for feature importance, MLP for capturing non-linear relationships.
                    Enables dynamic credit limit adjustments and personalized financial recommendations for customers.`,
      serviceMethod: ReportsService.getPredictAmount
    },
    {
      id: 'risk_assessment',
      title: 'Risk Assessment Report',
      description: `The report predicts whether a transaction will fail or succeed.
                    Includes amount, transaction_type, fee, merchant_category, region, source_account, destination_account, transaction_direction, and customer_id.
                    ML Models - XGBoost and Random Forest for feature importance, MLP for complex pattern recognition.
                    Enhances real-time transaction approval systems, reducing failures and improving customer trust.`,
      serviceMethod: ReportsService.getRiskAssessment
    }
  ];
  
  const toggleShowMore = (id: string) => {
    setShowMore(prev => ({ ...prev, [id]: !prev[id] }));
  };
  // Reset form fields to default values
  const resetFormFields = () => {
    setDateRange({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    });
    setLimit('100');
  };

  // Close popup and reset fields
  const closePopup = () => {
    setShowDownloadPopup(false);
    resetFormFields();
  };

  const handleDownloadClick = (reportId: string) => {
    setSelectedReport(reportId);
    setShowDownloadPopup(true);
  };

  const handleDownloadReport = async () => {
    if (!selectedReport) return;
    
    // Validate limit
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum <= 0 || limitNum > 999999) {
      alert('Please enter a valid limit between 1 and 999,999');
      return;
    }

    setIsDownloading(true);
    // Set loading state for the selected report
    setIsLoading(prev => ({ ...prev, [selectedReport]: true }));
    
    try {
      // Find the service method for the selected report
      const config = reportConfigs.find(config => config.id === selectedReport);
      if (!config) throw new Error('Report config not found');
      
      // Call the API with the selected parameters
      const response = await config.serviceMethod(
        dateRange.startDate, 
        dateRange.endDate, 
        limitNum
      );
      
      // Make sure we have data to download
      if (!response.data) {
        throw new Error('No data received from the server');
      }

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      const fileName = `${selectedReport}_${dateRange.startDate}_to_${dateRange.endDate}.xlsx`;
      // Set the file name
      link.setAttribute('download', fileName); // Adjust file name and extension if needed
      document.body.appendChild(link);
      link.click();

      // Clean up the link and URL object
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Update the reportData state for the selected report to show record count
      setReportData(prev => ({
        ...prev,
        [selectedReport]: response.data
      }));
      
      closePopup();
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsDownloading(false);
      // Reset loading state for the selected report
      setIsLoading(prev => ({ ...prev, [selectedReport]: false }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'startDate' | 'endDate') => {
    setDateRange(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setLimit(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-xl text-center mb-8 border-b">Machine Learning Predictive Reports</h1>
      
      <div className="flex flex-col space-y-5">
        {reportConfigs.map(config => (
          <div key={config.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-blue-600">{config.title}</h2>
              <button 
                className="text-blue-500 hover:text-blue-600 focus:outline-none" 
                onClick={() => handleDownloadClick(config.id)}
                aria-label="Download report"
                disabled={isLoading[config.id]}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            
            {/* Using the isLoading state to show loading indicator */}
            {isLoading[config.id] ? (
              <div className="flex justify-center py-2">
                <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : reportData[config.id] && reportData[config.id].length > 0 ? (
              <div className="text-sm text-gray-600">
                <p>{reportData[config.id].length} records available</p>
              </div>
            ) : (
                  ""
            )}
            {showMore[config.id] ? (
              <p className="text-sm mb-4">
                {config.description}
              </p>
            ) : (
              <p className="text-sm mb-4">
                {`${config.description.split(' ').slice(0, 50).join(' ')}...`}
              </p>
            )}

            <button
              className="text-blue-500 hover:text-blue-600 text-sm ml-auto block focus:outline-none mt-2"
              onClick={() => toggleShowMore(config.id)}
            >
              {showMore[config.id] ? 'Show Less' : 'Show More'}
            </button>

          </div>
        ))}
      </div>

      {/* Download Popup Modal */}
      {showDownloadPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Download Report</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 focus:outline-none" 
                onClick={closePopup}
                disabled={isDownloading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Start Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.startDate} 
                    onChange={(e) => handleDateChange(e, 'startDate')}
                    max={today} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select End Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={dateRange.endDate} 
                    onChange={(e) => handleDateChange(e, 'endDate')}
                    max={today}
                    min={dateRange.startDate} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limit
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={limit} 
                  onChange={handleLimitChange}
                  placeholder="Enter limit (max 999999)"
                />
              </div>
            </div>
            
            <div className="flex justify-end p-4 space-x-2 border-t border-gray-200">
              <button 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={closePopup}
                disabled={isDownloading}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                onClick={handleDownloadReport}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Downloading...
                  </>
                ) : 'Download Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;