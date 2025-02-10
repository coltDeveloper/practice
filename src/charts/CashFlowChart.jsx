'use client'
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dailyData, weeklyData, monthlyData, yearlyData } from '@/data/constData';

const CashFlowChart = () => {
  const [timeframe, setTimeframe] = useState('monthly');

  const timeframeOptions = useMemo(() => [
    { id: 'daily', label: 'Day', data: dailyData, key: 'date' },
    { id: 'weekly', label: 'Week', data: weeklyData, key: 'week' },
    { id: 'monthly', label: 'Month', data: monthlyData, key: 'month' },
    { id: 'yearly', label: 'Year', data: yearlyData, key: 'year' }
  ], []);

  const { data, key } = useMemo(() => {
    const option = timeframeOptions.find(opt => opt.id === timeframe) || timeframeOptions[2];
    return { data: option.data, key: option.key };
  }, [timeframe, timeframeOptions]);

  const formatTooltipValue = (value) => `$${value.toLocaleString()}`;

  return (
    <div>
      <div className="flex mb-4 border-b gap-4">
        {timeframeOptions.map(option => (
          <button
            key={option.id}


            className={`px-4 py-2 ${
              timeframe === option.id
                ? 'bg-[#270150] text-white rounded-lg p-2 '
                : 'text-gray-500 font-bold hover:text-[#270150] hover:bg-gray-100 transition-colors duration-200'
            }`}
            onClick={() => setTimeframe(option.id)}
            style={timeframe === option.id ? { backgroundColor: '#270150' } : {}}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={key}
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis 
            tickFormatter={formatTooltipValue}
            tick={{ fill: '#666' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <Tooltip 
            formatter={formatTooltipValue}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="cashflow" 
            stroke="#270150"
            strokeWidth={2}
            dot={{ fill: '#270150', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#270150' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
