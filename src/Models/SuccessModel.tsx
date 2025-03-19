import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bg-black inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden relative">
        {/* Header with close button - positioned absolutely in the top-right corner */}
        <div className="absolute top-2 right-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Light green background with checkmark */}
        <div className="bg-green-50 pt-16 pb-12 px-4 flex justify-center rounded-b-full">
          <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        
        {/* Text content */}
        <div className="text-center py-8 px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Successful!</h2>
          <p className="text-gray-600">Alert Promoted as Case</p>
        </div>
        
        {/* OK Button */}
        <div className="px-4 pb-4">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;