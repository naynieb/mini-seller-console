import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchField({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}: SearchFieldProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="pl-12 pr-4 py-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
