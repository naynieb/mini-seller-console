import React from 'react';

import SearchField from '../ui/form/SearchField';
import SelectInput from '../ui/form/SelectInput';
import { useFilterConfig } from '../../context/useUIContext';

export default function LeadFilters() {
  const { filterConfig, setFilterConfig } = useFilterConfig();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilterConfig(prev => ({ ...prev, searchTerm: e.target.value }))
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setFilterConfig(prev => ({
    ...prev,
    status: e.target.value === 'All' ? null : e.target.value
  }))

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 w-full lg:w-auto">
          <SearchField
            value={filterConfig.searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name or company..."
          />
        </div>
        <div className="w-full lg:w-48">
          <SelectInput
            name="status"
            value={filterConfig.status || 'All'}
            onChange={handleStatusChange}
            options={['All', 'New', 'Contacted', 'Qualified']}
          />
        </div>
      </div>
    </div>
  );
}
