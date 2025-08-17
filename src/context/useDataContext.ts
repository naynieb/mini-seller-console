import { useContext } from 'react';
import { DataContext } from './DataContextDefinition';

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export const useLeadsData = () => {
  const { leads, setLeads } = useDataContext();
  return { leads, setLeads };
};

export const useOpportunitiesData = () => {
  const { opportunities, setOpportunities } = useDataContext();
  return { opportunities, setOpportunities };
};

export const useSelectedLead = () => {
  const { selectedLead, setSelectedLead } = useDataContext();
  return { selectedLead, setSelectedLead };
};

export const useDataLoading = () => {
  const { isLoading, error } = useDataContext();
  return { isLoading, error };
};
