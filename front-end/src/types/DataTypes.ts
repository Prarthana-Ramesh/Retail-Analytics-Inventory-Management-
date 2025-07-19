export interface DataRow {
  'Order ID': string;
  'Customer Name': string;
  'Category': string;
  'Sub Category': string;
  'City': string;
  'Order Date': string;
  'Region': string;
  'Sales': number;
  'Discount': number;
  'Profit': number;
  'State': string;
}

export interface CategoryData {
  category: string;
  sales: number;
  profit: number;
  orders: number;
}

export interface CustomerSegment {
  segment: string;
  customers: number;
  avgSpend: number;
  totalSales: number;
}

export interface SeasonalData {
  month: string;
  sales: number;
  orders: number;
}

export interface CorrelationData {
  discount: number;
  sales: number;
}

export interface TopCustomer {
  name: string;
  totalSpend: number;
  orders: number;
}

export interface SubCategoryData {
  subCategory: string;
  category: string;
  sales: number;
  profit: number;
  profitMargin: number;
}