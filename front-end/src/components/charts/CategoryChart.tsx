import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CategoryData } from '../../types/DataTypes';

interface CategoryChartProps {
  data: CategoryData[];
}

const COLORS = ['#00ffff', '#0080ff', '#ff0080', '#00ff80', '#ff8000', '#8000ff'];

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  return (
    <div className="cyber-chart rounded-xl p-6">
      <h3 className="cyber-subtitle text-lg font-semibold mb-6">Category Performance</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales by Category - Bar Chart */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Sales by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
              <XAxis dataKey="category" stroke="#00ffff" fontSize={12} />
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
              <Bar dataKey="sales" fill="url(#blueGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="100%" stopColor="#0080ff" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Distribution - Pie Chart */}
        <div>
          <h4 className="text-md font-medium text-cyan-300 mb-4 font-mono">Order Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="orders"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                labelStyle={{ fill: '#00ffff', fontSize: '12px', fontFamily: 'monospace' }}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'Orders']}
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 26, 46, 0.95)', 
                  border: '1px solid #00ffff', 
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};