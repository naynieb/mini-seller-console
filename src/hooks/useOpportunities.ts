import { useCallback } from 'react';

import type { Opportunity } from '../types';
import { createOpportunity } from '../services/apiService';
import { useDataContext } from '../context/useDataContext';

export function useOpportunities() {
  const { opportunities, setOpportunities } = useDataContext();
  
  const createNewOpportunity = useCallback(async (data: Omit<Opportunity, 'id'>) => {
    // we can improve ID reconciliation by keeping a lookup map or implement queued actions
    // but for now this is fine
    const tempId = `TEMP-${Date.now()}`;
    
    try {
      setOpportunities(prev => [...prev, { id: tempId, ...data }]);
      
      const createdOpportunity = await createOpportunity(data);
      
      setOpportunities(prev => 
        prev.map(opp => opp.id === tempId ? createdOpportunity : opp)
      );
      
      return { success: true, opportunity: createdOpportunity };
    } catch (err) {
      setOpportunities(prev => prev.filter(opp => opp.id !== tempId));
      
      return { 
        success: false, 
        error: err instanceof Error ? err : new Error('An unknown error occurred') 
      };
    }
  }, [setOpportunities]);

  return {
    opportunities,
    createNewOpportunity
  };
}
