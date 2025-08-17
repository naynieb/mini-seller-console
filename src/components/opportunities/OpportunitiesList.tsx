import type { Opportunity } from '../../types';
import { useOpportunities } from '../../hooks/useOpportunities';
import { useDataLoading } from '../../context/useDataContext';
import DataTable from '../ui/DataTable';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import StatusBadge from '../ui/StatusBadge';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

export default function OpportunitiesList() {
  const { opportunities } = useOpportunities();
  const { isLoading } = useDataLoading();
  
  const columns = [
    { key: 'id' as keyof Opportunity, header: 'ID' },
    { key: 'name' as keyof Opportunity, header: 'Name' },
    { 
      key: 'stage' as keyof Opportunity, 
      header: 'Stage',
      render: (opportunity: Opportunity) => <StatusBadge status={opportunity.stage} />
    },
    { 
      key: 'amount' as keyof Opportunity, 
      header: 'Amount',
      render: (opportunity: Opportunity) => (
        opportunity.amount 
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(opportunity.amount)
          : '-'
      )
    },
    { key: 'accountName' as keyof Opportunity, header: 'Account' },
  ];
    
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <Card>
        <div className="p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BriefcaseIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities yet</h3>
          <p className="text-gray-500">Convert a lead to create your first opportunity</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <DataTable
        columns={columns}
        data={opportunities}
        keyExtractor={(opportunity) => opportunity.id}
      />
    </Card>
  );
}
