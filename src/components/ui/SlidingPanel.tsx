import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg';
}

export default function SlidingPanel({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md'
}: SlidingPanelProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  const positionClasses = {
    right: 'inset-y-0 right-0',
    left: 'inset-y-0 left-0'
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
        <div className={`fixed ${positionClasses[position]} ${position === 'right' ? 'pl-10' : 'pr-10'} max-w-full flex`}>
          <div className={`relative w-screen ${sizeClasses[size]}`}>
            <div className="h-full flex flex-col bg-white shadow-2xl overflow-y-auto">
              <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6 bg-white">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
