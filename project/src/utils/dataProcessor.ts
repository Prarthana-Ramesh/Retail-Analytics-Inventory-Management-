import { DataRow, CategoryData, CustomerSegment, SeasonalData, CorrelationData, TopCustomer, SubCategoryData } from '../types/DataTypes';

export class DataProcessor {
  private data: DataRow[] = [];

  constructor(data: DataRow[]) {
    this.data = data;
  }

  // Process category data
  getCategoryData(): CategoryData[] {
    const categoryMap = new Map<string, { sales: number; profit: number; orders: number }>();
    
    this.data.forEach(row => {
      const category = row.Category;
      const existing = categoryMap.get(category) || { sales: 0, profit: 0, orders: 0 };
      
      categoryMap.set(category, {
        sales: existing.sales + row.Sales,
        profit: existing.profit + row.Profit,
        orders: existing.orders + 1
      });
    });

    return Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      ...data
    }));
  }

  // Customer segmentation based on spending
  getCustomerSegmentation(): CustomerSegment[] {
    const customerSpending = new Map<string, number>();
    
    this.data.forEach(row => {
      const existing = customerSpending.get(row['Customer Name']) || 0;
      customerSpending.set(row['Customer Name'], existing + row.Sales);
    });

    const spendingValues = Array.from(customerSpending.values());
    const avgSpending = spendingValues.reduce((a, b) => a + b, 0) / spendingValues.length;
    const highSpendThreshold = avgSpending * 1.1;
    const lowSpendThreshold = avgSpending * 0.9;

    const segments = {
      'High Value': { customers: 0, totalSales: 0 },
      'Medium Value': { customers: 0, totalSales: 0 },
      'Low Value': { customers: 0, totalSales: 0 }
    };

    customerSpending.forEach((spending) => {
      if (spending > highSpendThreshold) {
        segments['High Value'].customers++;
        segments['High Value'].totalSales += spending;
      } else if (spending > lowSpendThreshold) {
        segments['Medium Value'].customers++;
        segments['Medium Value'].totalSales += spending;
      } else {
        segments['Low Value'].customers++;
        segments['Low Value'].totalSales += spending;
      }
    });

    return Object.entries(segments).map(([segment, data]) => ({
      segment,
      customers: data.customers,
      totalSales: data.totalSales,
      avgSpend: data.customers > 0 ? data.totalSales / data.customers : 0
    }));
  }

  // Seasonal analysis
  getSeasonalData(): SeasonalData[] {
    const monthlyData = new Map<string, { sales: number; orders: number }>();
    
    this.data.forEach(row => {
      const date = new Date(row['Order Date']);
      const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
      const existing = monthlyData.get(monthKey) || { sales: 0, orders: 0 };
      
      monthlyData.set(monthKey, {
        sales: existing.sales + row.Sales,
        orders: existing.orders + 1
      });
    });

    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }

  // Discount vs Sales correlation
  getDiscountSalesCorrelation(): CorrelationData[] {
    return this.data.map(row => ({
      discount: row.Discount * 100,
      sales: row.Sales
    }));
  }

  // Top spending customers
  getTopCustomers(limit: number = 10): TopCustomer[] {
    const customerData = new Map<string, { totalSpend: number; orders: number }>();
    
    this.data.forEach(row => {
      const existing = customerData.get(row['Customer Name']) || { totalSpend: 0, orders: 0 };
      customerData.set(row['Customer Name'], {
        totalSpend: existing.totalSpend + row.Sales,
        orders: existing.orders + 1
      });
    });

    return Array.from(customerData.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalSpend - a.totalSpend)
      .slice(0, limit);
  }

  // Sub-category analysis
  getSubCategoryData(): SubCategoryData[] {
    const subCategoryMap = new Map<string, { sales: number; profit: number; category: string }>();
    
    this.data.forEach(row => {
      const key = row['Sub Category'];
      const existing = subCategoryMap.get(key) || { sales: 0, profit: 0, category: row.Category };
      
      subCategoryMap.set(key, {
        sales: existing.sales + row.Sales,
        profit: existing.profit + row.Profit,
        category: row.Category
      });
    });

    return Array.from(subCategoryMap.entries())
      .map(([subCategory, data]) => ({
        subCategory,
        category: data.category,
        sales: data.sales,
        profit: data.profit,
        profitMargin: data.sales > 0 ? (data.profit / data.sales) * 100 : 0
      }))
      .sort((a, b) => b.sales - a.sales);
  }

  // Get summary statistics
  getSummaryStats() {
    const totalSales = this.data.reduce((sum, row) => sum + row.Sales, 0);
    const totalProfit = this.data.reduce((sum, row) => sum + row.Profit, 0);
    const uniqueCustomers = new Set(this.data.map(row => row['Customer Name'])).size;
    const totalOrders = this.data.length;
    const avgOrderValue = totalSales / totalOrders;
    const profitMargin = (totalProfit / totalSales) * 100;

    return {
      totalSales,
      totalProfit,
      uniqueCustomers,
      totalOrders,
      avgOrderValue,
      profitMargin
    };
  }
}