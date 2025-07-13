export interface InventoryItem {
  id: string;
  item_name: string;
  sku: string;
  total_received: number;
  total_dispatched: number;
  available_stock: number;
  status: 'healthy' | 'low' | 'critical';
  category: string;
  last_updated: Date;
}

export interface StockMovement {
  id: string;
  itemName: string;
  sku: string;
  unitsDispatched: number;
  timestamp: Date;
  destination: string;
}

export interface AIRecommendation {
  id: string;
  itemName: string;
  sku: string;
  predictedDemand: 'high' | 'medium' | 'low';
  suggestedAction: string;
  urgency: 'urgent' | 'moderate' | 'low';
  confidence: number;
  category: string;
}

export interface Region {
  id: string;
  name: string;
  code: string;
}