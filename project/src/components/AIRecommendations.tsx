import React from 'react';
import { Brain, Sparkles, TrendingUp, Calendar, Package, BarChart3 } from 'lucide-react';
import { useAIRecommendations } from '../hooks/useAIRecommendations';

const AIRecommendations: React.FC = () => {
  const { data, isLoading, error } = useAIRecommendations();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-blue-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Accessories': 'bg-purple-100 text-purple-800',
      'Food': 'bg-green-100 text-green-800',
      'Home Appliance': 'bg-gray-100 text-gray-800',
      'Decor': 'bg-orange-100 text-orange-800',
      'Clothing': 'bg-pink-100 text-pink-800',
      'Costume': 'bg-yellow-100 text-yellow-800',
      'Beverages': 'bg-green-100 text-green-800',
      'Bakery': 'bg-orange-100 text-orange-800',
      'Household': 'bg-gray-100 text-gray-800',
      'Produce': 'bg-emerald-100 text-emerald-800',
      'Toys': 'bg-yellow-100 text-yellow-800',
      'Sports': 'bg-indigo-100 text-indigo-800',
      'Health': 'bg-teal-100 text-teal-800',
      'Beauty': 'bg-rose-100 text-rose-800',
      'Automotive': 'bg-slate-100 text-slate-800',
      'Garden': 'bg-lime-100 text-lime-800',
      'Books': 'bg-amber-100 text-amber-800',
      'Music': 'bg-violet-100 text-violet-800',
      'Movies': 'bg-cyan-100 text-cyan-800',
      'Games': 'bg-fuchsia-100 text-fuchsia-800',
      'Office': 'bg-stone-100 text-stone-800',
      'Pet': 'bg-green-200 text-green-900',
      'Baby': 'bg-blue-200 text-blue-900',
      'Unknown': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-6 w-6 text-walmart-blue" />
        <h2 className="text-xl font-semibold text-gray-800">AI Stock Recommendations</h2>
        <Sparkles className="h-5 w-5 text-walmart-yellow animate-pulse" />
        <span className="bg-walmart-yellow bg-opacity-20 text-walmart-blue text-xs px-2 py-1 rounded-full">
          ML Powered
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-700">Error loading AI recommendations: {error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-walmart-blue"></div>
          <span className="ml-3 text-gray-600">Loading AI predictions...</span>
        </div>
      )}

      {!isLoading && !error && !data && (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No AI predictions available yet.</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="space-y-8">
          {/* Prediction Cards */}
          {data.predictions && data.predictions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-walmart-blue" />
                Prediction Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.predictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">SKU:</span> {prediction.sku}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Item:</span> {prediction.item}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Category:</span> 
                        <span className={`ml-2 inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(prediction.category || 'Unknown')}`}>
                          {prediction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visualization Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-walmart-blue" />
              Data Visualizations
            </h3>
            
            <div className="space-y-6">
              {/* Monthly Trends */}
              {data.monthly_trends_url && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    📊 Monthly Trends
                  </h4>
                  <img 
                    src={data.monthly_trends_url} 
                    alt="Monthly Trends" 
                    className="w-full rounded-xl shadow-lg border border-gray-100"
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      marginBottom: '16px'
                    }}
                  />
                </div>
              )}

              {/* Seasonal Patterns */}
              {data.seasonal_patterns_url && (
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    🌀 Seasonal Patterns
                  </h4>
                  <img 
                    src={data.seasonal_patterns_url} 
                    alt="Seasonal Patterns" 
                    className="w-full rounded-xl shadow-lg border border-gray-100"
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Summary Block */}
          {data.summary && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-walmart-blue" />
                📦 Summary
              </h3>
              <div className="bg-gradient-to-r from-walmart-blue to-walmart-blue-dark rounded-xl p-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-walmart-yellow">
                      {data.summary.total_records?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm opacity-90">Total Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-walmart-yellow">
                      {data.summary.unique_skus?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm opacity-90">Unique SKUs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-walmart-yellow">
                      {data.summary.total_quantity?.toLocaleString() || 'N/A'}
                    </div>
                    <div className="text-sm opacity-90">Total Dispatched</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;