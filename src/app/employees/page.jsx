"use client";

import { employeesTableHeading } from '@/data/tableHeading';
import { employeesTableData } from '@/data/constData';
import { FaSearch, FaTrash, FaEye, FaFileImport, FaFileExport } from 'react-icons/fa'; 
import { MdModeEditOutline } from 'react-icons/md';
import { useState } from 'react';
import AddEmployee from '@/model/employee/AddEmployee'; 
import ViewInstallment from '@/model/installment/viewInstallment';
import Papa from 'papaparse';

const Employees = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [viewInstallment, setViewInstallment] = useState(null); // New state for viewing installment

    // Filter data based on search term
    const filteredData = employeesTableData.filter(contact =>
        contact.employeeId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

    const handleAddEmployeeClick = () => {
        setShowAddEmployee(true);
    };

    const handleModalClose = () => {
        setShowAddEmployee(false);
    };
    const handleExportCSV = () => {
        const csvData = employeesTableData.map(employee => ({
            'Employee ID': employee.employeeId,
            'Name': employee.name,
            'Email': employee.email,
            'Phone': employee.phone,
            'Address': employee.address,
            'Company': employee.company,
            'Status': employee.status
        }));
    
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'employees.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleView = (item) => {
        setViewInstallment(item);
    };

    return (
        <div className="flex flex-col bg-white h-screen mt-4 mx-4 md:mt-2 md:mx-2">
            <h1 className={`text-2xl mb-2 text-left mb-4`}>Employees</h1>

            <div className="relative mb-4">
                <div className="flex items-center gap-4">
                    <div className="flex flex-1">
                        <input
                            type="text"
                            placeholder="Search contacts..."
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
                        onClick={handleAddEmployeeClick}
                    >
                        Add Employee
                    </button>
                </div>
            </div>

            <div className="rounded-sm ">
                <table className="min-w-full bg-white ">
                    <thead className="bg-gray-200 text-black">
                        <tr>
                            {employeesTableHeading.map((heading, index) => (
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

                                    className={`hover:bg-[#270150] hover:text-white transition duration-200 border`}
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
                                            onClick={() => handleView(item)} 
                                            className="text-white bg-[#270150] rounded-full px-1 py-1 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            onClick={() => setViewInstallment(item)}
                                            className="text-red-600 bg-red-200 rounded-full px-1 py-1 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>
                                </tr>
                            ))
                        ) : (   
                            <tr>
                                <td colSpan={employeesTableHeading.length + 1} className="px-4 py-8 text-center text-gray-500">
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

            {showAddEmployee && (
                <AddEmployee visible={showAddEmployee} onClose={handleModalClose} />
            )}

            {viewInstallment && (
                <ViewInstallment employee={viewInstallment} visible={true} onClose={() => setViewInstallment(null)} />
            )}
        </div>
    );
}

export default Employees;
