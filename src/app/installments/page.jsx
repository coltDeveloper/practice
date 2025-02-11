"use client";

import { installmentsTableHeading } from '@/data/tableHeading';
import { installmentsTableData } from '@/data/constData';
import { FaSearch, FaEye, FaFileImport, FaFileExport } from 'react-icons/fa'; // Added FaEye icon import
import { MdModeEditOutline } from 'react-icons/md';
import { useState } from 'react';
import AddInstallment from '@/model/installment/AddInstallment';
import ViewInstallment from '@/model/installment/viewInstallment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import Papa from 'papaparse';

const Installments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [filterStatus, setFilterStatus] = useState(''); // New state for filter status

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddInstallment, setShowAddInstallment] = useState(false);
    const [viewInstallment, setViewInstallment] = useState(null); // New state for viewing installment

    // Filter data based on search term, date range, and status
    const filteredData = installmentsTableData.filter(installment => {
        const contactDate = new Date(installment.dateTime);
        const isWithinDateRange = (!dateRange[0] || contactDate >= dateRange[0]) && (!dateRange[1] || contactDate <= dateRange[1]);
        const matchesStatus = filterStatus ? installment.status === filterStatus : true;
        return isWithinDateRange && matchesStatus && (
            installment.employeeId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            installment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = Number(e.target.value);
        setItemsPerPage(newItemsPerPage);
        // Adjust current page to prevent showing empty data
        const newTotalPages = Math.ceil(filteredData.length / newItemsPerPage);
        const newCurrentPage = Math.min(currentPage, newTotalPages);
        setCurrentPage(newCurrentPage);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleDateRangeChange = (dates) => {
        setDateRange(dates);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handleAddInstallmentClick = () => {
        setShowAddInstallment(true);
    };

    const handleModalClose = () => {
        setShowAddInstallment(false);
    };

    const handleFilterStatus = (status) => {
        setFilterStatus(status);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handleExportCSV = () => {
        const csvData = installmentsTableData.map(installment => ({
            'Installment ID': installment.installmentId,
            'Employee ID': installment.employeeId,
            'Name': installment.name,
            'Payed Amount': installment.payedAmount,
            'Remaining Amount': installment.remainingAmount,
            'No of Installment Payed': installment.noOfInstallmentPayed,
            'Total Installment': installment.totalInstallment,
            'Status': installment.status
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'installments.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewInstallment = (installment) => {
        setViewInstallment(installment);
    };

    return (
        <div className="flex flex-col bg-white h-screen mt-4 mx-4 md:mt-2 md:mx-2">
            <h1 className={`text-2xl mb-2 text-left mb-4`}>Installments</h1>

            <div className="relative mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-1">
                        <input
                            type="text"
                            placeholder="Search Installments..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:border-[#270150]"

                        />

                        <button
                            className="px-4 bg-[#270150] text-white rounded-r-lg hover:bg-[#1a0136] transition duration-200"
                            onClick={() => { }}
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="itemsPerPage" className="mr-2">Show:</label>
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="px-2 py-2 border rounded focus:outline-none focus:border-[#270150]"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <button
                        className="px-4 py-2 bg-[#270150] text-white rounded-lg hover:bg-[#1a0136] transition duration-200 flex items-center gap-2"
                        onClick={() => { }}
                    >
                        <FaFileImport />
                        Import
                    </button>
                    <button
                        className="px-4 py-2 bg-[#270150] text-white rounded-lg hover:bg-[#1a0136] transition duration-200 flex items-center gap-2"
                        onClick={handleExportCSV}
                    >
                        <FaFileExport />
                        Export
                    </button>
                    <button
                        className="px-4 py-2 bg-[#270150] text-white rounded-lg hover:bg-[#1a0136] transition duration-200"
                        onClick={handleAddInstallmentClick}
                    >
                        Add Installment

                    </button>

                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <RangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    className="px-4 py-2 border rounded focus:outline-none focus:border-[#270150]"
                />
                <button
                    className={`px-4 py-2 rounded-lg ${filterStatus === '' ? 'bg-[#270150] text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterStatus('')}
                >
                    All

                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${filterStatus === 'Paid' ? 'bg-[#270150] text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterStatus('Paid')}
                >
                    Paid

                </button>
                <button
                    className={`px-4 py-2 rounded-lg ${filterStatus === 'Unpaid' ? 'bg-[#270150] text-white' : 'bg-gray-200'}`}
                    onClick={() => handleFilterStatus('Unpaid')}
                >
                    Unpaid

                </button>

            </div>

            <div className="rounded-sm ">
                <table className="min-w-full bg-white ">
                    <thead className="bg-gray-200 text-black">
                        <tr>
                            {installmentsTableHeading.map((heading, index) => (
                                <th className="px-4 py-2 text-left" key={index}>
                                    {heading}
                                </th>
                            ))}

                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-[#270150] hover:text-white transition duration-200 border ${item.status === 'Unpaid' ? 'text-red-600' : ''}`}
                                >
                                    {Object.values(item).map((value, idx) => (
                                        <td key={idx} className="px-4 py-2 border-b text-left">
                                            {value}
                                        </td>
                                    ))}

                                    <td className="px-4 py-2 border-b text-left flex items-center gap-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-white bg-[#270150] rounded-full px-1 py-1 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                                        >
                                            <MdModeEditOutline />
                                        </button>

                                        <button
                                            onClick={() => handleViewInstallment(item)}
                                            className="text-white bg-[#270150] rounded-full px-1 py-1 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                                        >
                                            <FaEye />
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={installmentsTableHeading.length + 1} className="px-4 py-8 text-center text-gray-500">
                                    No matching records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination container with flex layout */}
                <div className="flex justify-between items-center py-4 px-4 bg-white">
                    <div className="text-sm text-gray-600">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-[#270150] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 rounded ${currentPage === number
                                    ? 'bg-[#270150] text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-[#270150] text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showAddInstallment && (
                <AddInstallment visible={showAddInstallment} onClose={handleModalClose} />
            )}

            {viewInstallment && (
                <ViewInstallment employee={viewInstallment} visible={true} onClose={() => setViewInstallment(null)} />
            )}
        </div>

    );
}

export default Installments;
