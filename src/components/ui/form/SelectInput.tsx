import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[] | string[];
  required?: boolean;
  error?: string;
}

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error
}: SelectInputProps) {
  const normalizedOptions: SelectOption[] = options.map(option =>
    typeof option === 'string' ? { value: option, label: option } : option
  );

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={!!error}
          className={`
            appearance-none block w-full pl-4 pr-10 py-3 text-sm
            border ${error ? 'border-red-300' : 'border-gray-300'} 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 rounded-lg bg-white shadow-sm transition-colors
          `}
        >
          {normalizedOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
