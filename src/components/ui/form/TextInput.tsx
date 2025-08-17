import React from 'react';

interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
}

export default function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
  type = 'text'
}: TextInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          block w-full px-4 py-3 text-sm border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-colors bg-white
          ${error ? 'border-red-300' : 'border-gray-300'}
        `}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
