import { createContext } from 'react';
import type { Lead, Opportunity } from '../types';

interface DataContextType {
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  selectedLead: Lead | null;
  setSelectedLead: React.Dispatch<React.SetStateAction<Lead | null>>;
  isLoading: boolean;
  error: Error | null;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);
