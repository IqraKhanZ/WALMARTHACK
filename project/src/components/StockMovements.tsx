import React, { useState, useMemo } from 'react';
import { TrendingDown, Clock, MapPin } from 'lucide-react';
import { StockMovement } from '../types';
import { formatDate } from '../utils/mockData';

interface StockMovementsProps {
  movements: StockMovement[];
  isLoading?: boolean;
  error?: string | null;
}

const StockMovements: React.FC<StockMovementsProps> = ({ movements, isLoading = false, error = null }) => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'all'>('today');

  const filteredMovements = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return movements.filter(movement => {
      switch (timeFilter) {
        case 'today':
          return movement.timestamp >= today;
        case 'week':
          return movement.timestamp >= weekAgo;
        default:
          return true;
      }
    });
  }, [movements, timeFilter]);

  const totalUnitsDispatched = useMemo(() => {
    return filteredMovements.reduce((sum, movement) => sum + movement.unitsDispatched, 0);
  }, [filteredMovements]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 lg:mb-0">
          <TrendingDown className="h-6 w-6 text-walmart-blue" />
          <h2 className="text-xl font-semibold text-gray-800">Stock Movements</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-walmart-yellow bg-opacity-20 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              Total Dispatched: {totalUnitsDispatched.toLocaleString()} units
            </span>
          </div>
          
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as 'today' | 'week' | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-walmart-blue"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-700">Error loading dispatches: {error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walmart-blue"></div>
          <span className="ml-3 text-gray-600">Loading dispatches...</span>
        </div>
      )}

      {!isLoading && !error && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovements.map((movement) => (
          <div key={movement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{movement.itemName}</h3>
                <p className="text-sm text-gray-500">SKU: {movement.sku}</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-walmart-blue">
                  {movement.unitsDispatched}
                </span>
                <p className="text-xs text-gray-500">units</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatDate(movement.timestamp)}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{movement.destination}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Dispatched
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
      
      {!isLoading && !error && filteredMovements.length === 0 && (
        <div className="text-center py-8">
          <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {movements.length === 0 ? 'No dispatches yet.' : 'No stock movements found for the selected time period'}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockMovements;