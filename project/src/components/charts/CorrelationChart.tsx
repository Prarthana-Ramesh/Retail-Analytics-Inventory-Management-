import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CorrelationData } from '../../types/DataTypes';

interface CorrelationChartProps {
  data: CorrelationData[];
}

export const CorrelationChart: React.FC<CorrelationChartProps> = ({ data }) => {
  // Calculate correlation coefficient
  const calculateCorrelation = (data: CorrelationData[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, d) => sum + d.discount, 0);
    const sumY = data.reduce((sum, d) => sum + d.sales, 0);
    const sumXY = data.reduce((sum, d) => sum + d.discount * d.sales, 0);
    const sumX2 = data.reduce((sum, d) => sum + d.discount * d.discount, 0);
    const sumY2 = data.reduce((sum, d) => sum + d.sales * d.sales, 0);
    
    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return isNaN(correlation) ? 0 : correlation;
  };

  const correlationCoeff = calculateCorrelation(data);

  return (
    <div className="cyber-chart rounded-xl p-6">
      <h3 className="cyber-subtitle text-lg font-semibold mb-6">Discount vs Sales Correlation</h3>
      
      <div className="mb-4 p-4 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
        <p className="text-sm text-cyan-200 font-mono">Correlation Coefficient: 
          <span className={`ml-2 font-semibold ${
            correlationCoeff > 0.3 ? 'text-green-400' : 
            correlationCoeff < -0.3 ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {correlationCoeff.toFixed(3)}
          </span>
        </p>
        <p className="text-xs text-cyan-300 mt-1 font-mono">
          {Math.abs(correlationCoeff) > 0.7 ? 'Strong' : 
           Math.abs(correlationCoeff) > 0.3 ? 'Moderate' : 'Weak'} 
          {correlationCoeff > 0 ? ' positive' : ' negative'} correlation
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart data={data.slice(0, 1000)}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.2)" />
          <XAxis 
            dataKey="discount" 
            name="Discount"
            unit="%"
            domain={[0, 'dataMax']}
            tickFormatter={(value) => `${value}%`}
            stroke="#00ffff"
            fontSize={12}
          />
          <YAxis 
            dataKey="sales" 
            name="Sales"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            stroke="#00ffff"
            fontSize={12}
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'sales' ? `$${Number(value).toLocaleString()}` : `${value}%`,
              name === 'sales' ? 'Sales' : 'Discount'
            ]}
            contentStyle={{ 
              backgroundColor: 'rgba(26, 26, 46, 0.95)', 
              border: '1px solid #00ffff', 
              borderRadius: '8px',
              color: '#ffffff'
            }}
          />
          <Scatter 
            dataKey="sales" 
            fill="#ff0080" 
            fillOpacity={0.7}
            stroke="#ff0080"
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-4 text-sm text-cyan-300 font-mono">
        <p>• Each point represents a sale transaction</p>
        <p>• X-axis shows discount percentage, Y-axis shows sales amount</p>
        <p>• Sample of up to 1,000 transactions shown for performance</p>
      </div>
    </div>
  );
};