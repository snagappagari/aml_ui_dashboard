import React, { useEffect, useState } from "react";
import aiIcon from '../../../src/assets/images/artificial-intelligence.png';
import { PaginationState } from "../../commonUtils/Interface";
import CustomerManagementServices from "../../Services/CustomerManagementServices";
import Table from "./Table";

const CustomerManagement: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10
    });
    const [list, setList] = useState<any[]>([]);

    const headerColumns = [


        {
            column: "Customer Id",
            columnValue: "customerId",
            width: "18%",
        },
        { column: "Amount", columnValue: "amount", width: "20%" },
        { column: "City", columnValue: "city", width: "18%" },
        // { column: "Created On", columnValue: "CreatedDate" },
        { column: "Country", columnValue: "country", width: "18%" },
        { column: "Region", columnValue: "region", width: "20%" },



    ];

    const getInfoByPrompt = () => {
        if (inputValue && inputValue !== '') {
            const obj = {
                prompt: inputValue,
                page: pagination?.currentPage,
                pageSize: pagination?.pageSize,
            };
            CustomerManagementServices.getAllTransactionsSummary(obj).then((res) => {
                if (res && res.data) {
                    console.log(res.data.transactions);
                    setList(res?.data?.transactions);
                    setPagination({
                        ...pagination,
                        totalPages: res.data?.totalPages,
                        totalElements: res.data?.totalRecords
                    });
                }
            });
        }
    };

    useEffect(() => {
        if (list.length > 0) {
            getInfoByPrompt();
        }
    }, [pagination.currentPage, pagination.pageSize])
    useEffect(() => {
        if (inputValue && inputValue !== '') {
            setList([])
            setPagination({
                currentPage: 0,
                totalPages: 0,
                totalElements: 0,
                pageSize: 10
            })
        }
    }, [inputValue])

    const handleReset = () => {
        setInputValue("");
        setList([])
        setPagination({
            currentPage: 0,
            totalPages: 0,
            totalElements: 0,
            pageSize: 10
        })
    };



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
    const handlePageChange = (newPage: number) => {
        // Ensure page is within valid range
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination({
                ...pagination,
                currentPage: newPage
            });
        }
    };


    return (
        <div className="grid grid-rows-[auto_1fr] gap-4 h-screen p-4 overflow-hidden">
            {/* Top Section: Textarea & Buttons */}
            <div className="flex flex-col w-full">
                {/* Heading with Icon */}
                <p className="text-black text-lg font-medium pb-2 flex items-center gap-2">
                    <img src={aiIcon} alt="AI Icon" className="w-6 h-6" />
                    AI-Based Customer Data Analytics
                </p>

                {/* Label */}
                <label className="text-sm font-light mb-2" htmlFor="customer-query">
                    Tell me what you are looking for?
                </label>

                {/* Textarea */}
                <textarea
                    id="customer-query"
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                    placeholder="Type here..."
                    disabled={list.length > 0}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                {/* Buttons aligned to the right */}
                <div className="flex justify-end gap-4 mt-2">
                    <button
                        className={`bg-white text-sm font-medium text-blue-600 border border-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white hover:border-white ${inputValue.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={inputValue.trim() === ""}

                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <button
                        className={`bg-blue-500 text-sm font-medium text-white px-6 py-2 rounded-md 
                hover:bg-blue-600 ${list.length > 0 || inputValue.trim() === "" ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={getInfoByPrompt}
                        disabled={list.length > 0 || inputValue.trim() === ""}
                    >
                        Submit
                    </button>


                </div>
            </div>

            {/* Bottom Section: Table */}
            <div className="w-full rounded-md p-4 overflow-auto ">

                {list.length > 0 && (<> <div className="flex items-center gap-6">
                    <p className="text-black text-xl font-medium">List of Customers</p>


                </div>

                    <div className="mt-2">
                        <Table
                            headerColumns={headerColumns}
                            updateWallet={() => { }}
                            authStore={list}
                            parentCallback={() => { }}
                            value={''}
                            modelCallBack={() => { }}
                            dailogType={"slider"}
                            statusPopover={false}
                            pagination={pagination}
                            renderPaginationNumbers={renderPaginationNumbers}
                            handlePageChange={handlePageChange}
                            getDetails={() => {

                            }}
                        />


                    </div>
                </>
                )}
            </div>
        </div >
    );
};

export default CustomerManagement;
