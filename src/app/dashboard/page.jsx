import React from 'react';  
import CashFlowChart from '@/charts/CashFlowChart'; 
import { FaUsers, FaReceipt, FaMoneyBillWave } from 'react-icons/fa';

const Dashboard = () => {

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
        <div className="">
          <div className="bg-white p-6 rounded-xl  border border-gray-200 mb-6">
            <h2 className="text-lg mb-1 text-center">Cashflow Forecast</h2>
            <div className="h-60 bg-white shadow-inner mb-5">
              <CashFlowChart />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
