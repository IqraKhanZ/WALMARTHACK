import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StockMovement } from '../types';

export const useDispatchesData = () => {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDispatchesData = async () => {
    try {
      const { data, error } = await supabase
        .from('dispatches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Transform the data to match our StockMovement interface
        const transformedData: StockMovement[] = data.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          itemName: item.item_name || 'Unknown Item',
          sku: item.sku || 'N/A',
          unitsDispatched: item.quantity || 0,
          timestamp: item.created_at ? new Date(item.created_at) : new Date(),
          destination: item.location || 'Unknown Location',
        }));

        setStockMovements(transformedData);
        setError(null);
      } else {
        setStockMovements([]);
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching dispatches data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dispatches data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchDispatchesData();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchDispatchesData, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    stockMovements,
    isLoading,
    error,
    refetch: fetchDispatchesData,
  };
};