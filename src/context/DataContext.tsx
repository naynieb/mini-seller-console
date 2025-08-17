import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { getLeads, getOpportunities } from '../services/apiService';
import type { Lead, Opportunity } from '../types';
import { DataContext } from './DataContextDefinition';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [leadsData, opportunitiesData] = await Promise.all([
          getLeads(),
          getOpportunities()
        ]);

        setLeads(leadsData);
        setOpportunities(opportunitiesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const value = useMemo(() => ({
    leads,
    setLeads,
    opportunities,
    setOpportunities,
    selectedLead,
    setSelectedLead,
    isLoading,
    error,
  }), [leads, opportunities, selectedLead, isLoading, error]);
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
