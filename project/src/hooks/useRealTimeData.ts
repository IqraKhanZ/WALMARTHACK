import { useState, useEffect } from 'react';
import { InventoryItem, StockMovement, AIRecommendation } from '../types';
import { mockInventoryItems, mockStockMovements, mockAIRecommendations } from '../utils/mockData';

export const useRealTimeData = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(mockStockMovements);
  const [aiRecommendations, setAIRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Simulate random stock movements
      const randomItem = mockInventoryItems[Math.floor(Math.random() * mockInventoryItems.length)];
      const randomDispatch = Math.floor(Math.random() * 50) + 1;
      
      const newMovement: StockMovement = {
        id: Date.now().toString(),
        itemName: randomItem.name,
        sku: randomItem.sku,
        unitsDispatched: randomDispatch,
        timestamp: new Date(),
        destination: `Store #${Math.floor(Math.random() * 9999)}`,
      };

      setStockMovements(prev => [newMovement, ...prev.slice(0, 9)]);
      
      // Update inventory
      setInventoryItems(prev => prev.map(item => 
        item.id === randomItem.id 
          ? { 
              ...item, 
              unitsDispatched: item.unitsDispatched + randomDispatch,
              currentStock: item.currentStock - randomDispatch,
              lastUpdated: new Date(),
              status: item.currentStock - randomDispatch < 100 ? 'critical' : 
                     item.currentStock - randomDispatch < 300 ? 'low' : 'healthy'
            }
          : item
      ));
      
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    inventoryItems,
    stockMovements,
    aiRecommendations,
    lastUpdated,
  };
};