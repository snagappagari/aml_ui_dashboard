import React, { useState, useEffect } from 'react';
// import ActionIcon from "../assets/ActionIcon.svg";
import AlertService from "../Services/AlertService";
import { Alert, ApiAlert } from "../commonUtils/Interface"; // Import shared interfaces

// Define the props interface
interface AlertsTableProps {
  onRowClick?: (alert: Alert) => void;
  setAlertData: (data: any) => void;
}

// Interface for pagination
interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}


const AlertsTable: React.FC<AlertsTableProps> = ({ onRowClick , setAlertData }) => {
  // State for alerts data
  const [apiAlerts, setApiAlerts] = useState<ApiAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 7
  });
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch alerts from API based on current page and page size
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const data = await AlertService.getAllAlerts(pagination.currentPage, pagination.pageSize);
        setApiAlerts(data.content || []);
        setAlertData(data.content || []); 
        // Update pagination state from the response
        setPagination({
          ...pagination,
          totalPages: data.page.totalPages,
          totalElements: data.page.totalElements
        });
        
        setError(null);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
        setError("Failed to load alerts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [pagination.currentPage, pagination.pageSize]);

  // Filter alerts based on search term
  const filteredAlerts = apiAlerts.filter(alert => 
    alert.alertId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // alert.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Map API alert to the shared Alert interface format
  const mapToAlertFormat = (apiAlert: ApiAlert): Alert => {
    return {
      id: apiAlert.alertId,
      description: apiAlert.alertType,
      date: formatDate(apiAlert.createdAt),
      rule: `Rule ID: ${apiAlert.ruleId}`,
      alertStatus: apiAlert.status,
      country: apiAlert.country
      // Add other mappings as needed
    };
  };

  // Handle row click with interface conversion
  const handleRowClick = (apiAlert: ApiAlert) => {
    if (onRowClick) {
      // Convert API alert to shared Alert format before passing to onRowClick
      const formattedAlert = mapToAlertFormat(apiAlert);
      onRowClick(formattedAlert);
    }
  };

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    // Ensure page is within valid range
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination({
        ...pagination,
        currentPage: newPage
      });
    }
  };

  // Go to specific page
  const goToPage = (page: number) => {
    handlePageChange(page);
  };

  // Enhanced Animated Loader Component
  const AnimatedLoader = () => (
    <div className="flex flex-col items-center justify-center h-48">
      <div className="relative">
        {/* Outer spinning circle */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
        
        {/* Dots circling around */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-0 transform translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
      </div>
      <p className="mt-4 text-blue-600 font-medium animate-pulse">Loading alerts...</p>
    </div>
  );

  // Generate pagination numbers
  const renderPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of visible page links
    
    let startPage = Math.max(0, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pagination.totalPages - 1, startPage + maxVisiblePages - 1);
    
    // Adjust start page if end page is maxed out
    if (endPage === pagination.totalPages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            pagination.currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blackhover:bg-blue-500'
          }`}
        >
          {i + 1}
        </button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Recent Alerts</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search alerts..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute right-3 top-3.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>
      
      {loading ? (
        <AnimatedLoader />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium">Alert ID</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Priority</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Location</th>
                  <th className="py-3 px-4 text-left text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert, index) => (
                    <tr 
                      key={alert.alertId} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} cursor-pointer hover:bg-gray-100`}
                      onClick={() => handleRowClick(alert)}
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">{alert.alertId}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{alert.alertType}</td>
                      {/* <td className="py-3 px-4 text-sm text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert.status === 'CLOSED' ? 'bg-green-100 text-green-800' :
                          alert.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.status}
                        </span>
                      </td> */}
                      <td className={`py-3 px-4 text-sm ${alert.priority?.toLowerCase() === "medium" ? "text-orange-400" :
                          alert.priority?.toLowerCase() === "low" ? "text-green-500" :
                            alert.priority?.toLowerCase() === "high" ? "text-red-600" :
                            alert.priority?.toLowerCase() === "critical" ? "text-purple-500" :
                              "text-gray-700"
                        }`}>
                        {alert.priority
                          ? alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1).toLowerCase()
                          : ""}
                      </td>

                      <td className="py-3 px-4 text-sm text-gray-700">{`${alert.city || ''}, ${alert.country || ''}`}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{formatDate(alert.createdAt)}</td>
                      {/* <td className="py-2 px-2 text-center">
                        <button 
                          className="w-6 h-6"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click when clicking the action button
                            // Action button specific logic here
                          }}
                        >
                          <img src={ActionIcon} alt="Action" />
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No alerts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination controls */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {pagination.currentPage * pagination.pageSize + 1} to {Math.min((pagination.currentPage + 1) * pagination.pageSize, pagination.totalElements)} of {pagination.totalElements} alerts
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(0)}
                  disabled={pagination.currentPage === 0}
                  className={`px-2 py-1 mx-1 rounded ${
                    pagination.currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 0}
                  className={`px-2 py-1 mx-1 rounded ${
                    pagination.currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                {renderPaginationNumbers()}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages - 1}
                  className={`px-2 py-1 mx-1 rounded ${
                    pagination.currentPage === pagination.totalPages - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => handlePageChange(pagination.totalPages - 1)}
                  disabled={pagination.currentPage === pagination.totalPages - 1}
                  className={`px-2 py-1 mx-1 rounded ${
                    pagination.currentPage === pagination.totalPages - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AlertsTable;