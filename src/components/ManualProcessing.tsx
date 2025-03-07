import React, { useState, useEffect, useRef } from 'react';
import Upload from "../assets/Upload.svg";

// Define comprehensive interface for progress data
interface ProgressData {
  phase: string;
  progressPercentage: number;
  processingTime: number;
  fileSize: number;
  
  // System Metrics
  cpuUsage: number;
  partitions: number;
  threads: number;
  transactions: number;
  throughput: number;
  avgPartitionTime: number;
  memoryUsage: number;
  errorCount: number;
  
  // Processing Metrics
  alertsGenerated: number;
  casesGenerated: number;
}

const ManualProcessing: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    phase: 'INITIAL',
    progressPercentage: 0,
    processingTime: 0,
    fileSize: 0,
    
    cpuUsage: 0,
    partitions: 0,
    threads: 0,
    transactions: 0,
    throughput: 0,
    avgPartitionTime: 0,
    memoryUsage: 0,
    errorCount: 0,
    
    alertsGenerated: 0,
    casesGenerated: 0
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processType, setProcessType] = useState<string>('');
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket connection effect
  useEffect(() => {
    socketRef.current = new WebSocket("ws://10.80.3.53:31888/progress-updates");
    socketRef.current.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        setProgressData(prevData => ({
          ...prevData,
          phase: data.phase || prevData.phase,
          progressPercentage: data.csvPercentage || data.casePercentage || data.alertPercentage || 0,
          processingTime: data.csvProcessingTime || data.caseProcessingTime || data.alertProcessingTime || 0,
          fileSize: data.fileSize || prevData.fileSize,
          
          cpuUsage: data.cpuUsage !== undefined ? data.cpuUsage : prevData.cpuUsage,
          partitions: data.systemPartitions !== undefined ? data.systemPartitions : prevData.partitions,
          threads: data.threads !== undefined ? data.threads : prevData.threads,
          transactions: data.transactions !== undefined ? data.transactions : prevData.transactions,
          throughput: data.throughput !== undefined ? data.throughput : prevData.throughput,
          avgPartitionTime: data.avgPartitionTime !== undefined ? data.avgPartitionTime : prevData.avgPartitionTime,
          memoryUsage: data.memoryUsage !== undefined ? data.memoryUsage : prevData.memoryUsage,
          errorCount: data.errorCount !== undefined ? data.errorCount : prevData.errorCount,
          
          alertsGenerated: data.alertProcessed !== undefined ? data.alertProcessed : prevData.alertsGenerated,
          casesGenerated: data.caseProcessed !== undefined ? data.caseProcessed : prevData.casesGenerated
        }));
      } catch (err) {
        console.error("Failed to parse JSON message:", event.data, err);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // File upload handler
  const handleFileUpload = async() => {
    if (!selectedFile) {
      document.getElementById('csvFileInput')?.click();
      return;
    }

    if (!processType) {
      alert("Please select a process type.");
      return;
    }

    let endpoint: string;
    switch (processType) {
      case 'transactions':
        endpoint = "http://10.80.3.53:31888/api/v1/csv/load-transactions";
        break;
      case 'alerts':
        endpoint = "http://10.80.3.53:31888/api/v1/csv/generate-alerts";
        break;
      case 'both':
        endpoint = "http://10.80.3.53:31888/api/v1/csv/process-all";
        break;
      case 'alerts-cases':
        endpoint = "http://10.80.3.53:31888/api/v1/csv/generate-alerts-cases";
        break;
      default:
        alert("Please select a process type.");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Make API call
    
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData
      });
      console.log(response)
      // Check response
      // if (!response.ok) {
      //   throw new Error("Upload failed");
      // }
      // Parse response
      // const responseData = await response.json();
      // Check for SUCCESS message
    
    } catch (error) {
      console.error("Upload error:", error);
      // setError(error instanceof Error ? error.message : "File upload failed. Please try again.");
    } 

    // fetch(endpoint, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     alert(data.message);
    //   })
    //   .catch(error => {
    //     console.error("Error:", error);
    //     alert("File upload failed. Please try again.");
    //   });
  };

  // Format time in "Minutes:Seconds"
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} min ${remainingSeconds} sec`;
  };

  return (
    <div className="p-4 bg-white">
      {/* TACP Title */}
      <p className="mb-4">TACP - Transactions, Alerts & Cases Processing</p>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
        <div className="text-gray-500 mb-4">
          <img src={Upload} alt="Upload" className="mx-auto mb-4 w-15 h-15" />
          {selectedFile ? `📂 ${selectedFile.name}` : 'Click to upload file (Max. file size 20 MB)'}
        </div>
        
        <input 
          type="file" 
          className="hidden" 
          id="csvFileInput"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setSelectedFile(files[0]);
            }
          }}
        />
        
        <div className="flex flex-col items-center">
          <select 
            className="border rounded px-4 py-2 mb-4 text-gray-600"
            value={processType}
            onChange={(e) => setProcessType(e.target.value)}
          >
            <option value="">Select Process Type</option>
            <option value="transactions">Transactions</option>
            <option value="alerts">Alerts</option>
            <option value="both">Alerts & Transactions</option>
            <option value="alerts-cases">Alerts & Cases</option>
          </select>
          
          <button 
            className="bg-[#0a8fff] text-white px-6 py-2 rounded-md"
            onClick={handleFileUpload}
          >
            Upload & Process
          </button>
        </div>
      </div>

      {/* Processing Status - Show only if file is uploaded */}
      {selectedFile && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>File Size: {(progressData.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
            <span>Current Phase: {progressData.phase.replace('_', ' ')}</span>
            <span>Total Time: {formatTime(progressData.processingTime / 1000)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#0a8fff] h-2.5 rounded-full" 
              style={{width: `${progressData.progressPercentage}%`}}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-2">
            Processing: {progressData.progressPercentage.toFixed(2)}% ({progressData.phase.replace('_', ' ')})
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { icon: 'src/assets/cpu-charge.svg', label: 'CPU Usage', value: `${progressData.cpuUsage}%` },
          { icon: 'src/assets/grid-8.svg', label: 'Partitions', value: progressData.partitions },
          { icon: 'src/assets/hierarchy.svg', label: 'Threads', value: progressData.threads },
          { icon: 'src/assets/document-text.svg', label: 'Transactions', value: progressData.transactions.toLocaleString() },
          { icon: 'src/assets/weight.svg', label: 'Throughput', value: `${progressData.throughput.toLocaleString()} rec/sec` },
          { icon: 'src/assets/timer.svg', label: 'Avg Partition Time', value: `${progressData.avgPartitionTime} ms` },
          { icon: 'src/assets/simcard.svg', label: 'Memory Usage', value: `${progressData.memoryUsage} MB` },
          { icon: 'src/assets/danger.svg', label: 'Error Count', value: progressData.errorCount },
          { icon: 'src/assets/lamp.svg', label: 'Alerts Generated', value: progressData.alertsGenerated },
          { icon: 'src/assets/layer.svg', label: 'Cases Generated', value: progressData.casesGenerated },
        ].map(({ icon, label, value }, index) => (
          <div key={index} className="border rounded-lg p-3 flex items-center space-x-3">
            <img src={icon} className="w-8 h-8" alt={label} />
            <div>
              <div className="text-sm">{label}</div>
              <div className="text-xs text-gray-500">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualProcessing;