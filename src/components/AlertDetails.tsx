import React, { useState, useRef } from 'react';
import Upload from "../assets/Upload.svg";

// Define the Alert type
interface Alert {
  id: string;
  description: string;
  date: string;
  rule: string;
  // Additional properties for detail view
  alertStatus?: string;
  amount?: string;
  transactionType?: string;
  network?: string;
  country?: string;
  ruleVersion?: string;
  owner?: string;
  caseID?: string;
  downloadFile?: string;
  transactionId?: string;

}

interface AlertDetailsProps {
  selectedAlert: Alert | null;
  onBackToTable: () => void;
}

const AlertDetails: React.FC<AlertDetailsProps> = ({ selectedAlert, onBackToTable }) => {
  // State for comment section
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Array<{ text: string, date: string }>>([]);
  // State for file upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = (id: any) => {
    navigator.clipboard.writeText(id).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 sec
    });
  };

  // Function to handle comment submission
  const handleAddComment = () => {
    if (isCommentEnabled && comment.trim()) {
      const newComment = {
        text: comment.trim(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      };
      setComments([...comments, newComment]);
      setComment('');
      setIsCommentEnabled(false);
    } else {
      setIsCommentEnabled(true);
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
    }
  };

  // Function to trigger file input click
  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!selectedAlert) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow mt-5">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <button
            onClick={onBackToTable}
            className="flex items-center mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span className="ml-2">Alert Details</span>
          </button>

          <div className="ml-auto">
            <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 mr-2 text-sm font-medium hover:bg-gray-50">
              Close
            </button>
            <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 mr-2 text-sm font-medium hover:bg-gray-50">
              Re-open
            </button>
            <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700">
              Escalate to case
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg mb-4">Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm mb-1">Alert ID</h4>
              <p className="text-sm">{selectedAlert.id}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Alert Date</h4>
              <p className="text-sm">{selectedAlert.date}</p>
            </div>
            {/* <div>
              <h4 className="text-sm mb-1">Amount Exceeded (₹)</h4>
              <p className="text-sm">{selectedAlert.amount}</p>
            </div> */}
            <div>
              <h4 className="text-sm mb-1">Alert Status</h4>
              <p className="text-sm">{selectedAlert.alertStatus}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Alert Type</h4>
              <p className="text-sm">{selectedAlert.description}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Rule ID</h4>
              <p className="text-sm">{selectedAlert.rule}</p>
            </div>
            {/* <div>
              <h4 className="text-sm mb-1">Transaction ID</h4>
              <p className="text-sm">{selectedAlert.transactionId}</p>
            </div> */}
            <div className="flex flex-col gap-1 relative">
              {/* Title & Icon in a Row */}
              <div className="flex items-center gap-1">
                <h4 className="text-sm mb-1">Transaction ID</h4>

                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                    onClick={() => handleCopy(selectedAlert.transactionId)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
                  </svg>

                  {/* Black Tooltip */}
                  {showTooltip && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md">
                      Copied!
                    </div>
                  )}
                </div>
              </div>

              {/* Customer ID Value Below */}
              <p className="text-sm font-normal font-lexend">{selectedAlert.transactionId}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Transaction Type</h4>
              <p className="text-sm">{selectedAlert.transactionType}</p>
            </div>
            {/* <div>
              <h4 className="text-sm mb-1">Transaction Type Identifier</h4>
              <p className="text-sm">6058</p>
            </div> */}
            <div>
              <h4 className="text-sm mb-1">Network</h4>
              <p className="text-sm">{selectedAlert.network}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Country</h4>
              <p className="text-sm">{selectedAlert.country}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Alert Owner</h4>
              <p className="text-sm">{selectedAlert.owner}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Last Updated</h4>
              <p className="text-sm">{selectedAlert.date}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Uploaded File</h4>
              {selectedAlert.downloadFile ? (
                <p className="text-sm text-blue-600 cursor-pointer">{selectedAlert.downloadFile}</p>
              ) : (
                <p className="text-sm text-gray-400">No file uploaded</p>
              )}
            </div>
            <div>
              <h4 className="text-sm mb-1">Rule Version</h4>
              <p className="text-sm">{selectedAlert.ruleVersion}</p>
            </div>
            <div>
              <h4 className="text-sm mb-1">Case ID</h4>
              <p className="text-sm">{selectedAlert.caseID}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Comments</h3>
          <div className="mb-4 bg-gray-50 p-4 rounded-md border border-gray-200 min-h-24">
            {comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {comments.map((comment, index) => (
                  <div key={index} className="border-b pb-2">
                    <p className="text-sm">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                  </div>
                ))}
              </div>
            )}

            {isCommentEnabled && (
              <div className="mt-3">
                <textarea
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Add your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="text-blue-600 text-sm font-medium"
              onClick={handleAddComment}
            >
              {isCommentEnabled ? 'Submit Comment' : 'Add Comment'}
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Attachments</h3>

          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-10 text-center cursor-pointer"
            onClick={triggerFileUpload}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />

            {uploadedFile ? (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-green-500">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p className="text-gray-600 mb-1">File uploaded: {uploadedFile.name}</p>
                <p className="text-xs text-gray-500">Click to change</p>
              </div>
            ) : (
              <>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg> */}
                <img src={Upload} alt="Upload" className="mx-auto mb-4 w-15 h-15" />
                <p className="text-gray-600 mb-1">Click to upload</p>
                <p className="text-xs text-gray-500">(Max. file size 25MB)</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;