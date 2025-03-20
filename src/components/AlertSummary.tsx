import React, { useEffect, useState } from 'react';
import AlertService from '../Services/AlertService';
import { AlertCountData } from '../commonUtils/Interface';

const AlertSummary: React.FC = () => {
  const [alertsData, setAlertsData] = useState<AlertCountData>({
    TOTAL: 0,
    high: 0,
    medium: 0,
    low: 0,
    critical: 0
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
          high: response.high || 0,
          medium: response.medium || 0,
          low: response.low || 0,
          critical: response.critical || 0
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
    { id: 'high', label: 'High', count: alertsData.high, colorClass: 'text-red-500' },
    { id: 'medium', label: 'Medium', count: alertsData.medium, colorClass: 'text-orange-500' },
    { id: 'low', label: 'Low', count: alertsData.low, colorClass: 'text-green-500' },
    { id: 'critical', label: 'Critical', count: alertsData.critical, colorClass: 'text-purple-500' }
  ];

  if (loading) {
    return <div className="flex items-center justify-center p-4">Loading alerts data...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex items-left gap-x-2">
      {alertCategories.map((category) => (
        <div key={category.id} className="border border-[#E8E8E8] bg-white rounded-md p-3 flex flex-col items-left w-28">
          <div className="text-xs text-gray-600">{category.label}</div>
          <div className={`text-lg ${category.colorClass}`}>
            {category.count}
          </div>
        </div>
      ))}
    </div>
    // <div className="flex items-center gap-x-2">
    //   {alertCategories.map((category) => (
    //     <div
    //       key={category.id}
    //       className="bg-white rounded-md border p-3 flex flex-col items-right w-[180px] h-[70px]"
    //     >
    //       <div className="text-sm font-medium text-gray-600">{category.label}</div>
    //       <div className={`text-lg font-semibold ${category.colorClass}`}>
    //         {category.count}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default AlertSummary;