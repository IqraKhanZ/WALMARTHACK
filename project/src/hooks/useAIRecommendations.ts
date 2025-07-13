import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Prediction {
  sku: string;
  item: string;
  category: string;
}

interface Summary {
  total_records: number;
  unique_skus: number;
  total_quantity: number;
  date_range: {
    start: string;
    end: string;
  };
}

interface AIRecommendationData {
  predictions: Prediction[];
  summary: Summary;
  monthly_trends_url: string;
  seasonal_patterns_url: string;
}

export const useAIRecommendations = () => {
  const [data, setData] = useState<AIRecommendationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAIRecommendations = async () => {
    try {
      const { data: result, error } = await supabase
        .from('sku_predictions')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

      if (error) {
        throw error;
      }

      if (result && result.length > 0) {
        const latestData = result[0];
        setData({
          predictions: (latestData.predictions || []).map((prediction: any) => ({
            ...prediction,
            confidence: typeof prediction.confidence === 'number' ? prediction.confidence : 0
          })),
          summary: latestData.summary || {},
          monthly_trends_url: latestData.monthly_trends_url || '',
          seasonal_patterns_url: latestData.seasonal_patterns_url || '',
        });
        setError(null);
      } else {
        setData(null);
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch AI recommendations');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAIRecommendations();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchAIRecommendations, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchAIRecommendations,
  };
};