import React, { useState, useEffect } from 'react';
import SubNavbar from './SubNavbar';
import AlertSummary from './AlertSummary';
import AlertsTable from './AlertTable';
import IndiaMap from './IndiaMap';
import AlertDetails from './AlertDetails';
import { Alert } from '../commonUtils/Interface';
import LoginService from '../Services/LoginService';

const Dashboard: React.FC = () => {
  // State for dynamic greeting and current time
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertData, setAlertData] = useState<any>(null);

  // Function to get the greeting message based on time
  const getGreeting = () => {
    const hours = currentTime.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userLogin = JSON.parse(sessionStorage.getItem("userLogin") || "{}");

  useEffect(() => {
    getLatestLogin();
    console.log(alertData)
  }, [])
  const getLatestLogin = () => {
    LoginService.getlatlogin().then((res) => {
      if (res) {
        console.log(res)
      }
    })
  }


  // Effect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Format time string
  const dateString = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}h · ${currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;

  // State to track whether we're showing the detail view
  const [showDetailView, setShowDetailView] = useState(false);
  // State to store the selected alert
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Function to handle row click
  const handleAlertRowClick = (alert: Alert) => {
    // Enhance the alert with additional mock data for the detail view
    const enhancedAlert: Alert = {
      ...alert,
      alertStatus: alert.alertStatus || 'Active',
      amount: '₹ 1500000',
      transactionType: 'Gaming_Gambling',
      network: 'Clear',
      country: alert.country || 'India',
      ruleVersion: 'Version 1.3456',
      owner: 'AZ_253JK',
      caseID: 'Not Assigned',
      downloadFile: ''
    };

    setSelectedAlert(enhancedAlert);
    setShowDetailView(true);
  };

  // Function to go back to the table view
  const handleBackToTable = () => {
    setShowDetailView(false);
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-5">
      <SubNavbar />
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Hello {userLogin?.firstName ? userLogin?.firstName : ''},</p>

          <h1 className="text-2xl">{getGreeting()}!</h1>
          <p className="text-xs text-gray-500">{dateString}</p>
        </div>
        <AlertSummary />
      </div>

      {!showDetailView ? (
        // Show the table and map when not in detail view
        <div className="flex gap-5">
          <div className="flex-1 bg-white rounded-lg shadow p-5">
            <AlertsTable
              onRowClick={handleAlertRowClick}
              setAlertData={setAlertData}
            />
          </div>
          <div className="flex-1 bg-white rounded-lg shadow p-5">
            <IndiaMap />
          </div>
        </div>
      ) : (
        // Show the detail view when an alert is selected
        <AlertDetails
          selectedAlert={selectedAlert}
          onBackToTable={handleBackToTable}
        />
      )}
    </div>
  );
};

export default Dashboard;