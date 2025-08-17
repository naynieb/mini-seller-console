import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 shadow-sm',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  return (
    <button
      type={type}
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-all duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105 active:scale-95'} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
