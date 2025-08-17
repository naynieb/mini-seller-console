import { useMemo } from 'react';

import type { Lead } from '../../types';
import { useLeads } from '../../hooks/useLeads';
import { useDataLoading } from '../../context/useDataContext';
import { useFilterConfig } from '../../context/useUIContext';
import { useTableSort } from '../../hooks/useTableSort';
import Card from '../ui/Card';
import DataTable from '../ui/DataTable';
import LeadFilters from './LeadFilters';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

export default function LeadsList() {
  const { leads, selectLead } = useLeads();
  const { isLoading, error } = useDataLoading();
  const { filterConfig } = useFilterConfig();
  const { sortConfig, handleSort } = useTableSort<Lead>();
  
  const filteredAndSortedLeads = useMemo(() => {
    if (leads.length === 0) return [];
    
    let result = [...leads];
    
    if (filterConfig.searchTerm) {
      const searchTerm = filterConfig.searchTerm.toLowerCase();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm) || 
        lead.company.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filterConfig.status) {
      result = result.filter(lead => lead.status === filterConfig.status);
    }

    const { key, direction } = sortConfig;
    const order = direction === 'asc' ? 1 : -1;
    
    return result.sort((a, b) => 
      a[key as keyof Lead] === b[key as keyof Lead] 
        ? 0 
        : a[key as keyof Lead] > b[key as keyof Lead] ? order : -order
    );
  }, [leads, sortConfig, filterConfig]);

  const columns = [
    { key: 'name' as keyof Lead, header: 'Name', sortable: true },
    { key: 'company' as keyof Lead, header: 'Company', sortable: true },
    { key: 'email' as keyof Lead, header: 'Email', sortable: true },
    { key: 'source' as keyof Lead, header: 'Source', sortable: true },
    { key: 'score' as keyof Lead, header: 'Score', sortable: true },
    { 
      key: 'status' as keyof Lead, 
      header: 'Status', 
      sortable: true,
      render: (lead: Lead) => <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' : 
          lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-green-100 text-green-800'}`}>
        {lead.status}
      </span>
    }
  ];
    
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg" role="alert">
        <div className="flex items-center">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          <strong className="font-semibold">Error!</strong>
          <span className="ml-2">{error.message}</span>
        </div>
      </div>
    );
  }

  return  (
    <Card>
      <LeadFilters />
      
      {filteredAndSortedLeads.length === 0 ? (
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BriefcaseIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredAndSortedLeads}
          keyExtractor={(lead) => lead.id}
          onRowClick={selectLead}
          onSort={handleSort}
          sortKey={sortConfig.key as keyof Lead}
          sortDirection={sortConfig.direction}
        />
      )}
    </Card>
  );
}
