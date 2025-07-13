import { InventoryItem, StockMovement, AIRecommendation, Region } from '../types';

export const mockRegions: Region[] = [
  { id: '1', name: 'North Central', code: 'NC' },
  { id: '2', name: 'South Central', code: 'SC' },
  { id: '3', name: 'Northeast', code: 'NE' },
  { id: '4', name: 'Southeast', code: 'SE' },
  { id: '5', name: 'West', code: 'W' },
];

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Coca-Cola 12-Pack',
    sku: 'SKU001',
    totalUnits: 2500,
    unitsDispatched: 450,
    currentStock: 2050,
    status: 'healthy',
    category: 'Beverages',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Bread - White Loaf',
    sku: 'SKU002',
    totalUnits: 800,
    unitsDispatched: 650,
    currentStock: 150,
    status: 'low',
    category: 'Bakery',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    sku: 'SKU003',
    totalUnits: 120,
    unitsDispatched: 95,
    currentStock: 25,
    status: 'critical',
    category: 'Electronics',
    lastUpdated: new Date(),
  },
  {
    id: '4',
    name: 'Tide Laundry Detergent',
    sku: 'SKU004',
    totalUnits: 1200,
    unitsDispatched: 300,
    currentStock: 900,
    status: 'healthy',
    category: 'Household',
    lastUpdated: new Date(),
  },
  {
    id: '5',
    name: 'Bananas (per lb)',
    sku: 'SKU005',
    totalUnits: 500,
    unitsDispatched: 420,
    currentStock: 80,
    status: 'low',
    category: 'Produce',
    lastUpdated: new Date(),
  },
  {
    id: '6',
    name: 'Samsung 65" TV',
    sku: 'SKU006',
    totalUnits: 45,
    unitsDispatched: 42,
    currentStock: 3,
    status: 'critical',
    category: 'Electronics',
    lastUpdated: new Date(),
  },
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    itemName: 'Coca-Cola 12-Pack',
    sku: 'SKU001',
    unitsDispatched: 50,
    timestamp: new Date(Date.now() - 10000),
    destination: 'Store #1234',
  },
  {
    id: '2',
    itemName: 'iPhone 15 Pro',
    sku: 'SKU003',
    unitsDispatched: 8,
    timestamp: new Date(Date.now() - 25000),
    destination: 'Store #5678',
  },
  {
    id: '3',
    itemName: 'Bread - White Loaf',
    sku: 'SKU002',
    unitsDispatched: 30,
    timestamp: new Date(Date.now() - 45000),
    destination: 'Store #9012',
  },
  {
    id: '4',
    itemName: 'Tide Laundry Detergent',
    sku: 'SKU004',
    unitsDispatched: 25,
    timestamp: new Date(Date.now() - 60000),
    destination: 'Store #3456',
  },
];

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    itemName: 'iPhone 15 Pro',
    sku: 'SKU003',
    predictedDemand: 'high',
    suggestedAction: 'Restock Urgently - 200 units needed',
    urgency: 'urgent',
    confidence: 92,
    category: 'Electronics',
  },
  {
    id: '2',
    itemName: 'Samsung 65" TV',
    sku: 'SKU006',
    predictedDemand: 'high',
    suggestedAction: 'Restock Urgently - 50 units needed',
    urgency: 'urgent',
    confidence: 88,
    category: 'Electronics',
  },
  {
    id: '3',
    itemName: 'Bread - White Loaf',
    sku: 'SKU002',
    predictedDemand: 'medium',
    suggestedAction: 'Restock Soon - 500 units recommended',
    urgency: 'moderate',
    confidence: 76,
    category: 'Bakery',
  },
  {
    id: '4',
    itemName: 'Bananas (per lb)',
    sku: 'SKU005',
    predictedDemand: 'medium',
    suggestedAction: 'Restock Soon - 300 units recommended',
    urgency: 'moderate',
    confidence: 71,
    category: 'Produce',
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'healthy':
      return 'text-green-600 bg-green-100';
    case 'low':
      return 'text-orange-600 bg-orange-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getUrgencyColor = (urgency: string): string => {
  switch (urgency) {
    case 'urgent':
      return 'text-red-600 bg-red-100';
    case 'moderate':
      return 'text-orange-600 bg-orange-100';
    case 'low':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};