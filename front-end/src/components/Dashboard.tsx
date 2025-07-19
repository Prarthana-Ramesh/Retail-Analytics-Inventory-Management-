import React, { useState } from 'react';
import { DataRow } from '../types/DataTypes';
import { DataProcessor } from '../utils/dataProcessor';
import { FileUpload } from './FileUpload';
import { SummaryCards } from './SummaryCards';
import { CategoryChart } from './charts/CategoryChart';
import { CustomerSegmentChart } from './charts/CustomerSegmentChart';
import { SeasonalChart } from './charts/SeasonalChart';
import { CorrelationChart } from './charts/CorrelationChart';
import { TopCustomersChart } from './charts/TopCustomersChart';
import { SubCategoryChart } from './charts/SubCategoryChart';
import { BarChart3, Upload, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [processor, setProcessor] = useState<DataProcessor | null>(null);
  const [showDataset, setShowDataset] = useState(false);

  const handleDataLoad = (newData: DataRow[]) => {
    setData(newData);
    setProcessor(new DataProcessor(newData));
  };

  // Show dataset modal
  const handleViewDataset = () => {
    setShowDataset(true);
  };

  if (!processor || data.length === 0) {
    return (
      <div className="min-h-screen cyber-grid" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <BarChart3 className="h-12 w-12 text-cyan-400 mr-3" />
              <h1 className="cyber-title text-4xl font-bold">Analytics Dashboard</h1>
            </div>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              Upload your dataset to unlock powerful insights including forecasting, customer segmentation, 
              correlation analysis, and comprehensive performance metrics.
            </p>
          </div>
          
          <FileUpload onDataLoad={handleDataLoad} />
          
          <div className="mt-16 text-center">
            <h2 className="cyber-subtitle text-2xl font-semibold mb-8">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="cyber-panel rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-cyan-300 mb-2 font-mono">Sales Forecasting</h3>
                <p className="text-cyan-200 text-sm">Category-wise performance analysis and trend forecasting</p>
              </div>
              <div className="cyber-panel rounded-xl p-6">
                <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-cyan-300 mb-2 font-mono">Customer Insights</h3>
                <p className="text-cyan-200 text-sm">Segmentation analysis and high-value customer identification</p>
              </div>
              <div className="cyber-panel rounded-xl p-6">
                <Upload className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-cyan-300 mb-2 font-mono">Advanced Analytics</h3>
                <p className="text-cyan-200 text-sm">Correlation analysis, seasonal trends, and sub-category performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const summaryStats = processor.getSummaryStats();
  const categoryData = processor.getCategoryData();
  const customerSegments = processor.getCustomerSegmentation();
  const seasonalData = processor.getSeasonalData();
  const correlationData = processor.getDiscountSalesCorrelation();
  const topCustomers = processor.getTopCustomers();
  const subCategoryData = processor.getSubCategoryData();

  return (
    <div className="min-h-screen cyber-grid" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}>
      {/* Header */}
      <div className="cyber-panel border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-cyan-400 mr-3" />
              <div>
                <h1 className="cyber-title text-2xl font-bold">Analytics Dashboard</h1>
                <p className="text-cyan-300 font-mono">{data.length.toLocaleString()} records analyzed</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleViewDataset}
                className="cyber-button px-4 py-2 rounded-lg transition-all flex items-center"
              >
                View Dataset
              </button>
              <button
                onClick={() => setData([])}
                className="cyber-button px-4 py-2 rounded-lg transition-all flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <SummaryCards stats={summaryStats} />

        {/* Charts Grid */}
        <div className="space-y-8">
          {/* Category Analysis */}
          <CategoryChart data={categoryData} />
          
          {/* Customer Analysis Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <CustomerSegmentChart data={customerSegments} />
            <TopCustomersChart data={topCustomers} />
          </div>
          
          {/* Trends and Correlation */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <SeasonalChart data={seasonalData} />
            <CorrelationChart data={correlationData} />
          </div>
          
          {/* Sub-Category Analysis */}
          <SubCategoryChart data={subCategoryData} />
        </div>
      </div>

      {/* Dataset Modal */}
      {showDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-8 max-w-3xl w-full overflow-auto relative">
            <button
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 font-bold text-lg"
              onClick={() => setShowDataset(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Dataset Preview</h3>
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full text-sm text-cyan-200 border border-cyan-500/30">
                <thead>
                  <tr>
                    {data[0] && Object.keys(data[0]).map((key) => (
                      <th key={key} className="px-3 py-2 border-b border-cyan-500/20 font-mono text-xs text-cyan-400">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 20).map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-3 py-2 border-b border-cyan-500/10 font-mono">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-cyan-400">Showing first 20 rows</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};