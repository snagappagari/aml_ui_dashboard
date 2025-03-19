import React, { useEffect, useState } from 'react';
import CaseService from '../../Services/CaseService';

const CaseSummary: React.FC = () => {
  const [dataSummary, setDataSummary] = useState({
    ARCHIVED: 0,
    CLOSED: 0,
    'IN PROGRESS': 0,
    NEW: 0,
    OPEN: 0,
    TOTAL: 0
  });
  const alertCategories = [
    { id: 'total', label: 'TOTAL', count: dataSummary.TOTAL, colorClass: 'text-blue-500' },
    { id: 'completed', label: 'OPEN', count: dataSummary.OPEN, colorClass: 'text-red-500' },
    { id: 'failed', label: 'NEW', count: dataSummary.NEW, colorClass: 'text-purple-500' },
    { id: 'low', label: 'IN_PROGRESS', count: dataSummary["IN PROGRESS"], colorClass: 'text-orange-500' },
    { id: 'critical', label: 'CLOSED', count: dataSummary.CLOSED, colorClass: 'text-green-500' },
    { id: 'critical', label: 'ARCHIVED', count: dataSummary.ARCHIVED, colorClass: 'text-gray-500' }
  ];

  useEffect(() => {
    caseCount();
  }, [])
  const caseCount = () => {
    CaseService.caseCount().then((res) => {
      if (res && res.data) {
        console.log(res.data.IN_PROGRESS)
        setDataSummary(res.data)
      }
    })

  }



  return (
    // <div className="flex items-center gap-x-2">
    //   {alertCategories.map((category) => (
    //     <div key={category.id} className="bg-white rounded-md shadow p-3 flex flex-col items-center w-20">
    //       <div className="text-sm font-medium text-gray-600">{category.label}</div>
    //       <div className={`text-lg font-semibold ${category.colorClass}`}>
    //         {category.count}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="flex items-center gap-x-2">
      {alertCategories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-md border p-3 flex flex-col items-right w-[180px] h-[70px]"
        >
          <div className="text-sm font-medium text-gray-600">{category.label}</div>
          <div className={`text-lg font-semibold ${category.colorClass}`}>
            {category.count}
          </div>
        </div>
      ))}
    </div>


  );
};

export default CaseSummary;