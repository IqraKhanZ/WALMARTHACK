import React from 'react';
import { Warehouse, User, Bell, ChevronDown, LogOut } from 'lucide-react';
import { Region } from '../types';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  selectedRegion: Region;
  regions: Region[];
  onRegionChange: (region: Region) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedRegion, regions, onRegionChange }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
    }
  };

  return (
    <header className="bg-walmart-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Warehouse className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Walmart Warehouse Manager</h1>
              <p className="text-walmart-yellow text-sm">Real-Time Inventory Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <select
                value={selectedRegion.id}
                onChange={(e) => {
                  const region = regions.find(r => r.id === e.target.value);
                  if (region) onRegionChange(region);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-walmart-yellow"
              >
                {regions.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name} ({region.code})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-white hover:bg-walmart-blue-dark rounded-full transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <User className="h-6 w-6" />
                <div className="text-right">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-walmart-yellow">{user?.role}</div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-white hover:bg-walmart-blue-dark rounded-full transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;