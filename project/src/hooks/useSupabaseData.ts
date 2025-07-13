import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { InventoryItem } from '../types';

export const useSupabaseData = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchDashboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('dashboard')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Transform the data to match our InventoryItem interface
        const transformedData: InventoryItem[] = data.map((item: any) => ({
          id: item.id?.toString() || Math.random().toString(),
          item_name: item.item_name || 'Unknown Item',
          sku: item.sku || 'N/A',
          total_received: item.total_received || 0,
          total_dispatched: item.total_dispatched || 0,
          available_stock: item.available_stock || 0,
          status: item.status || 'healthy',
          category: item.category || 'Uncategorized',
          last_updated: item.last_updated ? new Date(item.last_updated) : new Date(),
        }));

        setInventoryItems(transformedData);
        setError(null);
      } else {
        setInventoryItems([]);
      }

      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchDashboardData();

    // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchDashboardData, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    inventoryItems,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchDashboardData,
  };
};