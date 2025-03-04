import React, { useEffect, useState } from 'react';
import AlertService from '../Services/AlertService';
import { AlertCountData } from '../commonUtils/Interface';

const AlertSummary: React.FC = () => {
  const [alertsData, setAlertsData] = useState<AlertCountData>({
    TOTAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
    CRITICAL: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        setLoading(true);
        // Make the API call
        const response = await AlertService.getAlertCount();
        
        // Log the API response for debugging
        console.log('API response:', response);
        
        // Map the API response to your state object
        setAlertsData({
          TOTAL: response.TOTAL || 0,
          HIGH: response.HIGH || 0,
          MEDIUM: response.MEDIUM || 0,
          LOW: response.LOW || 0,
          CRITICAL: response.CRITICAL || 0
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching alert count:', err);
        setError('Failed to load alerts data');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertCount();
  }, []);

  const alertCategories = [
    { id: 'total', label: 'Total', count: alertsData.TOTAL, colorClass: 'text-blue-500' },
    { id: 'high', label: 'High', count: alertsData.HIGH, colorClass: 'text-red-500' },
    { id: 'medium', label: 'Medium', count: alertsData.MEDIUM, colorClass: 'text-orange-500' },
    { id: 'low', label: 'Low', count: alertsData.LOW, colorClass: 'text-green-500' },
    { id: 'critical', label: 'Critical', count: alertsData.CRITICAL, colorClass: 'text-purple-500' }
  ];

  if (loading) {
    return <div className="flex items-center justify-center p-4">Loading alerts data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex items-center gap-x-2">
      {alertCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-md shadow p-3 flex flex-col items-center w-20">
          <div className="text-xs text-gray-600">{category.label}</div>
          <div className={`text-lg font-semibold ${category.colorClass}`}>
            {category.count}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSummary;