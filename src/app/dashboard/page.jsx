import React from 'react';
import CashFlowChart from '@/charts/CashFlowChart';
import CircleChart from '@/charts/CircleChart'; // Assuming the import path for CircleChart
import { FaUsers, FaReceipt, FaMoneyBillWave } from 'react-icons/fa';

const Dashboard = () => {
  const unpaidInstallments = [
    { name: 'John Doe', amount: '$500', dueDate: '2023-10-15' },
    { name: 'Jane Smith', amount: '$750', dueDate: '2023-10-20' },
    { name: 'Alice Johnson', amount: '$300', dueDate: '2023-10-25' },
  ];

  return (
    <div className="flex flex-col mt-4 mx-4 md:mt-2 md:mx-2">
      <h1 className={`text-4xl mb-2 text-left mb-4`}>
        Dashboard
      </h1>
      <div className="flex-1">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
          <div className="bg-[#270150] p-6 rounded-xl shadow-lg border border-gray-200 flex items-center justify-between ">
            <div >
              <p className="text-white text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-white">1,015</p>
            </div>
            <FaUsers className="text-3xl text-white" />
          </div>
          <div className="bg-[#270150] p-6 rounded-xl shadow-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Paid Installments</p>
              <p className="text-2xl font-bold text-white">115/300</p>
            </div>
            <FaReceipt className="text-3xl text-white" />

          </div>
          <div className="bg-[#270150] p-6 rounded-xl shadow-lg border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-white">$2,122</p>
            </div>
            <FaMoneyBillWave className="text-3xl text-white" />

          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h2 className="text-lg mb-1 text-center">Cashflow Forecast</h2>
          <div className="h-60 bg-white shadow-inner mb-5">
            <CashFlowChart />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 p-0 rounded-lg shadow-md mb-6">
            <h2 className="text-lg border-b-2 text-center p-2 bg-[#270150] text-white">Unpaid Installments This Month</h2>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-black">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {unpaidInstallments.map((item, index) => (
                    <tr key={index} className="hover:bg-[#270150] hover:text-white transition duration-200 border">
                      <td className="px-4 py-2 border-b text-left">{item.name}</td>
                      <td className="px-4 py-2 border-b text-left">{item.amount}</td>
                      <td className="px-4 py-2 border-b text-left">{item.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          <div className="bg-white border-2 p-0 rounded-lg shadow-md mb-6">
            <h2 className="text-lg border-b-2 text-center p-2 bg-[#270150] text-white">Graph</h2>
            <div className="h-[300px] bg-white shadow-inner mb-5">
                <CircleChart />
              </div>
          </div>
          </div>

        </div>
      </div>
      );
};

      export default Dashboard;
