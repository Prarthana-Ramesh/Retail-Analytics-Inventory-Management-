import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SeasonalData } from '../../types/DataTypes';

interface SeasonalChartProps {
  data: SeasonalData[];
}

export const SeasonalChart: React.FC<SeasonalChartProps> = ({ data }) => {
  return (
    <div className="cyber-chart rounded-xl p-6">
      <h3 className="cyber-subtitle text-lg font-semibold mb-6">Seasonal Sales Trends</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Monthly Sales</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis dataKey="month" stroke="#00ffff" fontSize={12} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} stroke="#00ffff" fontSize={12} />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#00ffff" 
                fill="url(#areaGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#0080ff" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Volume Trend */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Monthly Order Volume</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis dataKey="month" stroke="#00ffff" fontSize={12} />
              <YAxis stroke="#00ffff" fontSize={12} />
              <Tooltip 
                formatter={(value) => [value, 'Orders']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#00ff80" 
                strokeWidth={3}
                dot={{ fill: '#00ff80', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Peak Analysis */}
      <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <h5 className="font-medium text-cyan-300 mb-2 font-mono">Peak Season Analysis</h5>
        {data.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-cyan-200">
                Highest Sales: {data.reduce((max, curr) => curr.sales > max.sales ? curr : max, data[0]).month}
              </p>
            </div>
            <div>
              <p className="text-sm text-cyan-200">
                Most Orders: {data.reduce((max, curr) => curr.orders > max.orders ? curr : max, data[0]).month}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};