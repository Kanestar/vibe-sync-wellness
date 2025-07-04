import React, { useState } from 'react';
import { X, Package, MapPin, CreditCard, Truck } from 'lucide-react';
import { WellnessKit } from '../types';

interface KitOrderModalProps {
  isVisible: boolean;
  onClose: () => void;
  onOrderComplete: (orderData: any) => void;
  availableKits: WellnessKit[];
}

export const KitOrderModal: React.FC<KitOrderModalProps> = ({ 
  isVisible, 
  onClose, 
  onOrderComplete, 
  availableKits 
}) => {
  const [selectedKit, setSelectedKit] = useState<string>('');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [step, setStep] = useState<'select' | 'shipping' | 'payment'>('select');

  const handleKitSelect = (kitId: string) => {
    setSelectedKit(kitId);
    setStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleOrderComplete = () => {
    const selectedKitData = availableKits.find(kit => kit.id === selectedKit);
    onOrderComplete({
      kit: selectedKitData,
      shipping: shippingInfo,
      orderId: `ORDER-${Date.now()}`,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">Order Wellness Kit</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'select' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-500'
            }`}>
              <Package className="w-4 h-4" />
            </div>
            <div className={`w-16 h-1 ${step !== 'select' ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'shipping' ? 'bg-purple-500 text-white' : step === 'payment' ? 'bg-purple-100 text-purple-500' : 'bg-gray-200 text-gray-400'
            }`}>
              <MapPin className="w-4 h-4" />
            </div>
            <div className={`w-16 h-1 ${step === 'payment' ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Kit Selection */}
        {step === 'select' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Wellness Kit</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableKits.map((kit) => (
                <div
                  key={kit.id}
                  className="border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => handleKitSelect(kit.id)}
                >
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-32 object-cover rounded-xl mb-3"
                  />
                  <h5 className="font-bold text-gray-800 mb-2">{kit.name}</h5>
                  <p className="text-gray-600 text-sm mb-3">{kit.description}</p>
                  <div className="text-2xl font-bold text-purple-600 mb-3">${kit.price}</div>
                  <div className="space-y-1">
                    {kit.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-purple-500">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                    {kit.items.length > 3 && (
                      <div className="text-sm text-gray-500">+{kit.items.length - 3} more items</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Information */}
        {step === 'shipping' && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setStep('select')}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                ← Back to Kit Selection
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h4>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="123 Main Street"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="NY"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="United States"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                Continue to Payment
              </button>
            </form>
          </div>
        )}

        {/* Payment */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setStep('shipping')}
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                ← Back to Shipping
              </button>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment & Confirmation</h4>
            
            <div className="bg-purple-50 rounded-2xl p-4 mb-6">
              <h5 className="font-semibold text-gray-800 mb-2">Order Summary</h5>
              {selectedKit && (
                <div className="flex items-center justify-between">
                  <span>{availableKits.find(k => k.id === selectedKit)?.name}</span>
                  <span className="font-bold">${availableKits.find(k => k.id === selectedKit)?.price}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>${availableKits.find(k => k.id === selectedKit)?.price}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-800">Free Shipping</span>
              </div>
              <p className="text-sm text-gray-600">
                Estimated delivery: 3-5 business days to {shippingInfo.city}, {shippingInfo.country}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                This is a demo. No actual payment will be processed.
              </p>
              <button
                onClick={handleOrderComplete}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                Complete Order (Demo)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};