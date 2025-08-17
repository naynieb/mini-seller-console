import { useCallback } from 'react';
import type { Lead } from '../types';
import { updateLead } from '../services/apiService';
import { useDataContext } from '../context/useDataContext';

export function useLeads() {
  const { leads, setLeads, selectedLead, setSelectedLead } = useDataContext();
  
  const selectLead = useCallback((lead: Lead) => setSelectedLead(lead), [setSelectedLead]);
  const clearSelectedLead = useCallback(() => setSelectedLead(null), [setSelectedLead]);

  const updateLeadData = useCallback(async (leadId: string, data: Partial<Lead>) => {
    const originalLead = leads.find(l => l.id === leadId);
    if (!originalLead) return { success: false, error: new Error('Lead not found') };
    
    try {
      setLeads(prevLeads => 
        prevLeads.map(l => 
          l.id === leadId ? { ...l, ...data } as Lead : l
        )
      );
      
      await updateLead(leadId, data);
      return { success: true };
    } catch (err) {
      console.error('Failed to update lead:', err);
      
      setLeads(prevLeads => prevLeads.map(l => l.id === leadId ? originalLead : l));
      
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('An unknown error occurred') 
      };
    }
  }, [leads, setLeads]);

  return {
    leads,
    selectedLead,
    selectLead,
    clearSelectedLead,
    updateLeadData
  };
}
