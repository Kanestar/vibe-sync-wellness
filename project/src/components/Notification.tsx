import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  autoClose = true,
  duration = 3000
}) => {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  if (!isVisible) return null;

  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`${getNotificationStyles()} rounded-2xl p-4 shadow-xl max-w-sm min-w-[300px]`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {type === 'success' && <CheckCircle className="w-5 h-5" />}
            <span className="font-medium">{message}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};