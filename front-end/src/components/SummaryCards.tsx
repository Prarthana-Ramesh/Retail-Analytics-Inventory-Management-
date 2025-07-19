import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, Percent, Target } from 'lucide-react';

interface SummaryCardsProps {
  stats: {
    totalSales: number;
    totalProfit: number;
    uniqueCustomers: number;
    totalOrders: number;
    avgOrderValue: number;
    profitMargin: number;
  };
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      title: 'Total Profit',
      value: `$${stats.totalProfit.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      title: 'Unique Customers',
      value: stats.uniqueCustomers.toLocaleString(),
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      title: 'Avg Order Value',
      value: `$${stats.avgOrderValue.toFixed(2)}`,
      icon: Target,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20'
    },
    {
      title: 'Profit Margin',
      value: `${stats.profitMargin.toFixed(1)}%`,
      icon: Percent,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="cyber-stat-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-cyan-300 font-mono uppercase tracking-wider">{card.title}</p>
              <p className="text-2xl font-bold text-white font-mono">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};