import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { WellnessKit } from '../types';

interface DeliveryTrackerProps {
  kit: WellnessKit;
  onClose: () => void;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ kit, onClose }) => {
  const getStatusIcon = (status: string, isActive: boolean) => {
    switch (status) {
      case 'preparing':
        return <Package className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />;
      case 'shipped':
        return <Truck className={`w-6 h-6 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />;
      case 'delivered':
        return <CheckCircle className={`w-6 h-6 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />;
      default:
        return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'from-blue-500 to-blue-600';
      case 'shipped': return 'from-orange-500 to-orange-600';
      case 'delivered': return 'from-green-500 to-green-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const statuses = [
    { key: 'preparing', label: 'Preparing', description: 'Your wellness kit is being curated' },
    { key: 'shipped', label: 'Shipped', description: 'On its way to you' },
    { key: 'delivered', label: 'Delivered', description: 'Enjoy your wellness journey!' }
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === kit.deliveryStatus);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Delivery Tracking</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <img
            src={kit.image}
            alt={kit.name}
            className="w-full h-32 object-cover rounded-2xl mb-4"
          />
          <h4 className="font-bold text-gray-800 mb-2">{kit.name}</h4>
          <p className="text-gray-600 text-sm mb-4">{kit.description}</p>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Kit Contents:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {kit.items.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-purple-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {statuses.map((status, index) => {
            const isActive = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={status.key} className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isActive 
                    ? `bg-gradient-to-r ${getStatusColor(status.key)}` 
                    : 'bg-gray-100'
                } ${isCurrent ? 'ring-4 ring-purple-200' : ''}`}>
                  {getStatusIcon(status.key, isActive)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className={`font-semibold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {status.label}
                    </h5>
                    {isCurrent && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {status.description}
                  </p>
                </div>
                
                {index < statuses.length - 1 && (
                  <div className={`w-px h-8 ${isActive ? 'bg-purple-300' : 'bg-gray-200'} ml-6`}></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800">Estimated Delivery:</span>
            <span className="text-sm text-purple-600">
              {kit.estimatedDelivery.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};