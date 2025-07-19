import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TopCustomer } from '../../types/DataTypes';
import { Crown } from 'lucide-react';

interface TopCustomersChartProps {
  data: TopCustomer[];
}

export const TopCustomersChart: React.FC<TopCustomersChartProps> = ({ data }) => {
  return (
    <div className="cyber-chart rounded-xl p-6">
      <div className="flex items-center mb-6">
        <Crown className="h-6 w-6 text-yellow-400 mr-2" />
        <h3 className="cyber-subtitle text-lg font-semibold">Top Spending Customers</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            stroke="#00ffff"
            fontSize={12}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={120}
            tick={{ fontSize: 12, fill: '#00ffff' }}
          />
          <Tooltip 
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Total Spend']}
            contentStyle={{ 
              backgroundColor: 'rgba(26, 26, 46, 0.95)', 
              border: '1px solid #00ffff', 
              borderRadius: '8px',
              color: '#ffffff'
            }}
          />
          <Bar 
            dataKey="totalSpend" 
            fill="url(#goldGradient)"
            radius={[0, 4, 4, 0]}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff8000" />
              <stop offset="100%" stopColor="#ffff00" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      {/* Top 3 Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.slice(0, 3).map((customer, index) => (
          <div key={customer.name} className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30">
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-yellow-400' : 
                index === 1 ? 'bg-gray-300' : 'bg-orange-400'
              }`}>
                {index + 1}
              </div>
              <span className="ml-2 font-medium text-cyan-300 truncate font-mono">
                {customer.name}
              </span>
            </div>
            <p className="text-sm text-cyan-200">{customer.orders} orders</p>
            <p className="text-lg font-semibold text-white font-mono">
              ${customer.totalSpend.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};