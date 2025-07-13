import React, { useState } from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { useDispatchesData } from '../hooks/useDispatchesData';
import { mockRegions } from '../utils/mockData';
import { Region } from '../types';
import Header from './Header';
import InventoryOverview from './InventoryOverview';
import StockMovements from './StockMovements';
import AIRecommendations from './AIRecommendations';
import { Clock, Wifi } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>(mockRegions[0]);
  const { inventoryItems, isLoading, error, lastUpdated } = useSupabaseData();
  const { stockMovements, isLoading: dispatchesLoading, error: dispatchesError } = useDispatchesData();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        selectedRegion={selectedRegion}
        regions={mockRegions}
        onRegionChange={setSelectedRegion}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedRegion.name} Region Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time inventory management and AI-powered recommendations
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
              <Wifi className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Live</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">Error loading data: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Retry
              </button>
            </div>
          ) : (
            <InventoryOverview items={inventoryItems} isLoading={isLoading} />
          )}
          <StockMovements 
            movements={stockMovements} 
            isLoading={dispatchesLoading}
            error={dispatchesError}
          />
          <AIRecommendations />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;