import React, { useEffect, useState } from 'react';
import AlertDetails from './TransactionDetails';
import TrasactionsService from '../../Services/TrasactionsService';
import AlertSummary from './TransactionSummary';
import Table from './Table';
import { PaginationState } from '../../commonUtils/Interface';

const Transactions: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>("");
  const headerColumns = [
    // { column: "S.No", columnValue: "action", width: "14.2%" },
    { column: "Transaction Id", columnValue: "transactionId", width: "25%" },
    {
      column: "Customer Id",
      columnValue: "customerId",
      width: "13%",
    },
    { column: "Direction", columnValue: "direction", width: "10%" },
    // { column: "Created On", columnValue: "CreatedDate" },
    { column: "Merchant Id", columnValue: "merchantId", width: "13%" },
    { column: "Merchant Category", columnValue: "merchantCategory", width: "15%" },
    { column: "Status", columnValue: "status", width: "10%" },
    { column: "Date", columnValue: "createdAt", width: "10%" },

  ];
  const [showDetailView, setShowDetailView] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [viewList, setViewList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10
  });

  const getAllTransactions = (page: number, size: number) => {
    TrasactionsService.getAllTrasactions(page, size).then((res) => {
      if (res && res.data?.content) {
        setList(res.data?.content)
        console.log(res)
        // setPagination(res.data?.page)
        setPagination({
          ...pagination,
          totalPages: res.data?.page.totalPages,
          totalElements: res.data?.page.totalElements
        });
      }
    })
  }

  const handlePageChange = (newPage: number) => {
    // Ensure page is within valid range
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination({
        ...pagination,
        currentPage: newPage
      });
    }
  };

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
          className={`px-3 py-1 mx-1 rounded ${pagination.currentPage === i
            ? 'bg-blue-500 text-white text-sm'
            : 'bg-white  text-sm text-blackhover:bg-blue-500'
            }`}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumbers;
  };


  const goToPage = (page: number) => {
    handlePageChange(page);
  };

  useEffect(() => {
    if (pagination.pageSize > 0) {
      getAllTransactions(pagination.currentPage, pagination.pageSize);
    }
  }, [pagination.currentPage, pagination.pageSize, showDetailView])
  useEffect(() => {
    if (filterValue.length === 0) {
      getAllTransactions(0, 10);
    }
  }, [filterValue])

  const handleSearch = () => {
    serachTranscation(filterValue);
  }
  const serachTranscation = (value: any) => {
    TrasactionsService.getTrasactionById(value).then((res) => {
      console.log(res)
      if (res && res.data) {

        setList([res.data])
        // setPagination(res.data?.page)
        setPagination({
          currentPage: 0,
          totalPages: 0,
          totalElements: 0,
          pageSize: 0
        });
      }
    })

  }

  const getDetails = (value: any) => {
    serachTranscationShow(value)

  }
  const serachTranscationShow = (value: any) => {
    TrasactionsService.getTrasactionById(value).then((res) => {
      console.log(res)
      if (res && res.data) {
        setViewList([res.data])
        setShowDetailView(true);
        // setPagination(res.data?.page)
        // setPagination({
        //   currentPage: 0,
        //   totalPages: 0,
        //   totalElements: 0,
        //   pageSize: 0
        // });
      }
    })

  }

  const getBackTable = () => {
    setShowDetailView(false);
    console.log(pagination.currentPage, pagination.pageSize, 'pagination.currentPage, pagination.pageSize')

  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between items-center pt-4">
          <div>
          </div>

          <AlertSummary />

        </div>
        {!showDetailView ? (
          <div className="grid mt-4">
            <div className=" border border-slate-100 shadow-md rounded-lg p-3">
              {/* <div className="flex items-center gap-4">
                <p className="text-black font-light">List of Transactions</p>

                <div className="relative">
                  <input
                    type="text"
                    className="w-[273px] h-[26px] rounded-[12px] px-[12px] pr-[32px] py-[6px] bg-gray-100 text-sm"
                    placeholder="Search"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />

                  <svg
                    className="absolute top-1/2 right-[10px] transform -translate-y-1/2 h-4 w-4 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div> */}
              <div className="flex items-center gap-6">
                <p className="text-black text-xl font-medium">List of Transactions</p>

                <div className="relative">
                  <input
                    type="text"
                    className="w-[320px] h-[36px] rounded-[12px] px-[14px] pr-[40px] py-[8px] bg-gray-100 text-black text-sm font-lexendDecaLight"
                    placeholder="Search"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                  <svg
                    className="absolute top-1/2 right-[12px] transform -translate-y-1/2 h-5 w-5 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
              </div>

              <div className="mt-2">
                <Table
                  headerColumns={headerColumns}
                  updateWallet={() => { }}
                  authStore={list}
                  parentCallback={() => { }}
                  value={filterValue}
                  modelCallBack={() => { }}
                  dailogType={"slider"}
                  statusPopover={false}
                  pagination={pagination}
                  renderPaginationNumbers={renderPaginationNumbers}
                  handlePageChange={handlePageChange}
                  getDetails={getDetails}
                />


              </div>


            </div>
          </div>
        ) : (

          <AlertDetails
            selectedAlert={viewList[0]}
            onBackToTable={getBackTable}
          />
        )}
      </div >
    </>
  );
};

export default Transactions;