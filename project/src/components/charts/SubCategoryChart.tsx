import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SubCategoryData } from '../../types/DataTypes';

interface SubCategoryChartProps {
  data: SubCategoryData[];
}

export const SubCategoryChart: React.FC<SubCategoryChartProps> = ({ data }) => {
  // Take top 15 for better visualization
  const topSubCategories = data.slice(0, 15);

  return (
    <div className="cyber-chart rounded-xl p-6">
      <h3 className="cyber-subtitle text-lg font-semibold mb-6">Sub-Category Analysis</h3>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Sales Performance */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Top Sub-Categories by Sales</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topSubCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis 
                type="number"
                dataKey="sales" 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                stroke="#00ffff"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="subCategory" 
                width={100}
                tick={{ fontSize: 11, fill: '#00ffff' }}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="url(#salesGradient)"
                radius={[0, 4, 4, 0]}
              />
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0080ff" />
                  <stop offset="100%" stopColor="#00ffff" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Margin Analysis */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Profit Margin by Sub-Category</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topSubCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis 
                type="number"
                dataKey="profitMargin" 
                domain={['dataMin', 'dataMax']}
                tickFormatter={(value) => `${value.toFixed(0)}%`}
                stroke="#00ffff"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="subCategory" 
                width={100}
                tick={{ fontSize: 11, fill: '#00ffff' }}
              />
              <Tooltip 
                formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Profit Margin']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar 
                dataKey="profitMargin"
                radius={[0, 4, 4, 0]}
                fill="url(#profitGradient)"
              />
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00ff80" />
                  <stop offset="100%" stopColor="#80ff00" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary Table */}
      <div className="mt-8">
        <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Performance Summary</h4>
        <div className="overflow-x-auto">
          <table className="cyber-table min-w-full divide-y divide-cyan-500/30">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sub-Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Margin
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/20">
              {topSubCategories.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300 font-mono">
                    {item.subCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                    ${item.sales.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                    ${item.profit.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.profitMargin > 20 ? 'cyber-status-high text-black' :
                      item.profitMargin > 10 ? 'cyber-status-medium text-black' :
                      'cyber-status-low text-white'
                    }`}>
                      {item.profitMargin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};