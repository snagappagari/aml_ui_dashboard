import React, { useState } from 'react';
import { Alert } from '../commonUtils/Interface';
import SuccessModal from '../Models/SuccessModel';

interface PromoteToCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: Alert | null;
  onPromote: (data: PromoteToCaseData) => void;
}

export interface PromoteToCaseData {
  description: string;
  transactionId: string;
  caseType: string;
  alertId: string;
  status: string; // Adjust possible status values as needed
  alertSent: boolean;
  caseOwner: string;
  priority: string // Adjust possible priority values as needed
  network: string;
  city: string;
  country: string;
  region: string;
}

const PromoteToCaseModal: React.FC<PromoteToCaseModalProps> = ({ isOpen, onClose, alert, onPromote }) => {
  const [caseSeverity, setCaseSeverity] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [caseOwner, setCaseOwner] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaseOwner(e.target.value);
  };
  if (!isOpen || !alert) return null;

  const handlePromote = () => {
    const data: PromoteToCaseData = {
      description: caseDescription || '',
      transactionId: alert.transactionId || '',
      caseType: 'AML', // Ensure this is a valid caseType value
      alertId: alert.id || '',
      status: alert.alertStatus || '', // Set a valid status value or adjust dynamically
      alertSent: false,
      caseOwner: caseOwner,
      priority: caseSeverity as 'LOW' | 'MEDIUM' | 'HIGH' || 'CRITICAL', // Ensure this matches the allowed priority types
      network: alert.network || '',
      city: '',
      country: alert.country || '',
      region: alert.region || '',
    };
  
    onPromote(data);
    onClose();
    setShowSuccessModal(true);
  };
  
  
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-4">
          <div className="flex justify-between items-center border-b">
            <h2 className="text-xl">Promote to Case</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="py-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm mb-0.5">Alert ID</label>
                <div className="text-sm">{alert.id}</div>
              </div>
              <div>
                <label className="text-sm mb-0.5">Alert Date</label>
                <div className="text-sm">{alert.date}</div>
              </div>
              <div>
                <label className="text-sm mb-0.5">Transaction ID</label>
                <div className="text-sm">{alert.transactionId}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm mb-0.5">Case Owner</label>
                <input
                  type="text"
                  className={`border rounded-md px-3 py-2 text-sm w-full focus:outline-none`}
                  value={caseOwner}
                  onChange={handleInputChange}
                  placeholder="Enter Case Owner"
                  required
                />
              </div>
              <div>
                <label className="text-sm mb-0.5">Case Priority</label>
                <div className="text-sm">{caseSeverity || null}</div>
              </div>
              <div>
                <label className="text-sm mb-0.5">Country</label>
                <div className="text-sm">{alert.country}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm mb-0.5">Region</label>
                <div className="text-sm">{alert.region}</div>
              </div>
              <div>
                <label className="text-sm mb-0.5">Network</label>
                <div className="text-sm">{alert.network}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm mb-0.5">Case Priority</label>
                <div className="relative">
                  <select
                    value={caseSeverity}
                    onChange={(e) => setCaseSeverity(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Case Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm mb-0.5">Description</label>
                <textarea
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  placeholder="Enter Description"
                  className="block w-full border border-gray-300 rounded-md py-1.5 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={1}
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-6 py-1.5 border border-blue-600 rounded-md text-blue-600"
            >
              Cancel
            </button>
            <button 
              onClick={handlePromote}
              className="px-6 py-1.5 bg-blue-600 text-white rounded-md"
            >
              Create case
            </button>
          </div>
        </div>
      </div>

      {/* Render the success modal conditionally */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={handleSuccessModalClose} 
      />
    </>
  );
};

export default PromoteToCaseModal;