import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { DataRow } from '../types/DataTypes';

interface FileUploadProps {
  onDataLoad: (data: DataRow[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoad }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDataset, setShowDataset] = useState(false);
  const [sampleData, setSampleData] = useState<DataRow[]>([]);
  // Path to sample dataset
  const sampleDatasetPath = 'preprocessed_dataset.csv';

  // Load sample dataset
  const loadSampleDataset = useCallback(() => {
    setIsProcessing(true);
    setError(null);
    fetch(sampleDatasetPath)
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          transform: (value, header) => {
            if (["Sales", "Discount", "Profit"].includes(header)) {
              const num = parseFloat(value);
              return isNaN(num) ? 0 : num;
            }
            return value;
          },
          complete: (results) => {
            try {
              const data = results.data as DataRow[];
              setSampleData(data);
              onDataLoad(data);
              setIsProcessing(false);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to process sample dataset');
              setIsProcessing(false);
            }
          },
          error: (error) => {
            setError(error.message);
            setIsProcessing(false);
          }
        });
      })
      .catch(() => {
        setError('Failed to fetch sample dataset');
        setIsProcessing(false);
      });
  }, [onDataLoad]);

  // Show dataset modal/table
  const handleViewDataset = useCallback(() => {
    if (sampleData.length === 0) {
      // Load sample if not already loaded
      fetch(sampleDatasetPath)
        .then(res => res.text())
        .then(csv => {
          Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            transform: (value, header) => {
              if (["Sales", "Discount", "Profit"].includes(header)) {
                const num = parseFloat(value);
                return isNaN(num) ? 0 : num;
              }
              return value;
            },
            complete: (results) => {
              setSampleData(results.data as DataRow[]);
              setShowDataset(true);
            }
          });
        });
    } else {
      setShowDataset(true);
    }
  }, [sampleData]);

  const processFile = useCallback((file: File) => {
    setIsProcessing(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transform: (value, header) => {
        // Convert numeric fields
        if (['Sales', 'Discount', 'Profit'].includes(header)) {
          const num = parseFloat(value);
          return isNaN(num) ? 0 : num;
        }
        return value;
      },
      complete: (results) => {
        try {
          const data = results.data as DataRow[];
          
          // Validate required fields
          const requiredFields = ['Order ID', 'Customer Name', 'Category', 'Sub Category', 'Order Date', 'Sales'];
          const firstRow = data[0];
          
          if (!firstRow) {
            throw new Error('No data found in file');
          }

          const missingFields = requiredFields.filter(field => !(field in firstRow));
          if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
          }

          onDataLoad(data);
          setIsProcessing(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process file');
          setIsProcessing(false);
        }
      },
      error: (error) => {
        setError(error.message);
        setIsProcessing(false);
      }
    });
  }, [onDataLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      processFile(csvFile);
    } else {
      setError('Please upload a CSV file');
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 cyber-grid">
      <div
        className={`cyber-upload relative rounded-xl p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'active'
            : 'hover:border-cyan-400'
        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center space-y-4">
          {isProcessing ? (
            <div className="cyber-loading animate-spin rounded-full h-12 w-12"></div>
          ) : (
            <Upload className="h-12 w-12 text-cyan-400" />
          )}

          <div>
            <h3 className="cyber-subtitle text-xl font-semibold mb-2">
              {isProcessing ? 'Processing...' : 'Upload your dataset'}
            </h3>
            <p className="text-cyan-200">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-sm text-cyan-400 mt-2 font-mono">
              Expected fields: Order ID, Customer Name, Category, Sub Category, City, Order Date, Region, Sales, Discount, Profit, State
            </p>
          </div>

          <div className="flex flex-row gap-4 mt-6">
            <button
              type="button"
              className="cyber-button px-4 py-2 rounded-lg font-mono text-cyan-300 border border-cyan-400 hover:bg-cyan-900/20"
              onClick={loadSampleDataset}
              disabled={isProcessing}
            >
              Explore Demo Dataset
            </button>
          </div>
        </div>
      </div>

      {showDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-8 max-w-3xl w-full overflow-auto relative">
            <button
              className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 font-bold text-lg"
              onClick={() => setShowDataset(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Sample Dataset Preview</h3>
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full text-sm text-cyan-200 border border-cyan-500/30">
                <thead>
                  <tr>
                    {sampleData[0] && Object.keys(sampleData[0]).map((key) => (
                      <th key={key} className="px-3 py-2 border-b border-cyan-500/20 font-mono text-xs text-cyan-400">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleData.slice(0, 20).map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-3 py-2 border-b border-cyan-500/10 font-mono">{val as string}</td>
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

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <span className="text-red-300">{error}</span>
        </div>
      )}
    </div>
  );
};