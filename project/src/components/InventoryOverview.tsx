import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { InventoryItem } from '../types';
import { getStatusColor, formatDate } from '../utils/mockData';

interface InventoryOverviewProps {
  items: InventoryItem[];
  isLoading?: boolean;
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ items, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(item => item.category)));
    return ['all', ...cats];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchTerm, selectedCategory, selectedStatus]);

  const handleExport = () => {
    const csvContent = [
      ['Item Name', 'SKU', 'Total Units', 'Units Dispatched', 'Current Stock', 'Status', 'Category'],
      ...filteredItems.map(item => [
        item.item_name,
        item.sku,
        item.total_received.toString(),
        item.total_dispatched.toString(),
        item.available_stock.toString(),
        item.status,
        item.category
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <Package className="h-6 w-6 text-walmart-blue" />
          <h2 className="text-xl font-semibold text-gray-800">Inventory Overview</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search items or SKU..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-walmart-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-walmart-blue"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-walmart-blue"
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="low">Low Stock</option>
            <option value="critical">Critical</option>
          </select>
          
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-walmart-blue text-white rounded-md hover:bg-walmart-blue-dark transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walmart-blue"></div>
            <span className="ml-3 text-gray-600">Loading inventory data...</span>
          </div>
        )}
        
        {!isLoading && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Levels
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.item_name}</div>
                    <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{item.total_received.toLocaleString()} received</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-900">{item.total_dispatched.toLocaleString()} dispatched</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{item.available_stock.toLocaleString()} available</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.last_updated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>
      
      {!isLoading && filteredItems.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {items.length === 0 ? 'No data available yet. Please check your Supabase connection.' : 'No items found matching your criteria'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryOverview;