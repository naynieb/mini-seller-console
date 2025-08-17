import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
}

export default function Card({ children, title, footer, className = '' }: CardProps) {
  return (
    <div className={`bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">{title}</h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
