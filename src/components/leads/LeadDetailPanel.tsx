import { useState } from 'react';
import type { Lead, Opportunity, OpportunityStage } from '../../types';
import { useLeads } from '../../hooks/useLeads';
import { useOpportunities } from '../../hooks/useOpportunities';
import SlidingPanel from '../ui/SlidingPanel';
import LeadForm from './LeadForm';
import OpportunityForm from '../opportunities/OpportunityForm';
import Button from '../ui/Button';

export default function LeadDetailPanel() {
  const { selectedLead, clearSelectedLead, updateLeadData } = useLeads();
  const { createNewOpportunity } = useOpportunities();
  
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [opportunitySuccessMessage, setOpportunitySuccessMessage] = useState<string | null>(null);
  
  if (!selectedLead) return null;

  const handleCreateOpportunity = async (data: Omit<Opportunity, 'id'>) => {
    const result = await createNewOpportunity(data);
    
    if (result.success) {
      setShowOpportunityForm(false);
      setOpportunitySuccessMessage('Opportunity created successfully');
      setTimeout(() => setOpportunitySuccessMessage(null), 5000);
      return { success: true };
    }
    
    return { 
      success: false, 
      error: result.error 
    };
  };

  const handleLeadSubmit = async (leadId: string, data: Partial<Lead>) => {
    const result = await updateLeadData(leadId, data);
    if (result.success) {
      setOpportunitySuccessMessage(null);
    }
    return result;
  };

  return (
    <SlidingPanel 
      isOpen={!!selectedLead} 
      onClose={clearSelectedLead}
      title="Lead Details"
    >
      {!showOpportunityForm ? (
        <>
          <LeadForm 
            lead={selectedLead}
            onSubmit={handleLeadSubmit}
            onCancel={clearSelectedLead}
            successMessage={opportunitySuccessMessage}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="success"
              fullWidth
              onClick={() => setShowOpportunityForm(true)}
            >
              Convert Lead
            </Button>
          </div>
        </>
      ) : (
        <OpportunityForm
          initialData={{
            name: '',
            stage: 'Discovery' as OpportunityStage,
            amount: '',
            accountName: selectedLead.company
          }}
          onSubmit={handleCreateOpportunity}
          onCancel={() => setShowOpportunityForm(false)}
        />
      )}
    </SlidingPanel>
  );
}
