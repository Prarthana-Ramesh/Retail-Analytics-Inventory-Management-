import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CustomerSegment } from '../../types/DataTypes';

interface CustomerSegmentChartProps {
  data: CustomerSegment[];
}

const COLORS = ['#00ff80', '#ff8000', '#ff0080'];

export const CustomerSegmentChart: React.FC<CustomerSegmentChartProps> = ({ data }) => {
  return (
    <div className="cyber-chart rounded-xl p-6">
      <h3 className="cyber-subtitle text-lg font-semibold mb-6">Customer Segmentation</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Count by Segment */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Customer Count by Value Segment</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis dataKey="segment" stroke="#00ffff" fontSize={12} />
              <YAxis stroke="#00ffff" fontSize={12} />
              <Tooltip 
                formatter={(value) => [value, 'Customers']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="customers" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Average Spend by Segment */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Average Spend per Customer</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis dataKey="segment" stroke="#00ffff" fontSize={12} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} stroke="#00ffff" fontSize={12} />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Avg Spend']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar dataKey="avgSpend" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map((segment, index) => (
          <div key={segment.segment} className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-4 text-center">
            <div className={`w-4 h-4 rounded mx-auto mb-2`} style={{ backgroundColor: COLORS[index] }}></div>
            <h5 className="font-medium text-cyan-300 font-mono">{segment.segment}</h5>
            <p className="text-sm text-cyan-200">{segment.customers} customers</p>
            <p className="text-sm font-semibold text-white font-mono">${segment.avgSpend.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};