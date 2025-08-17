import leadsData from '../data/leads.json';
import opportunitiesData from '../data/opportunities.json';
import type { Lead, Opportunity } from '../types';

const SIMULATED_DELAY = 500;
const FAILURE_RATE = 0.1; // 1 in 10 chance of failure

const simulateNetworkRequest = <T>(data: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        reject(new Error('Network request failed'));
      } else {
        resolve(data);
      }
    }, SIMULATED_DELAY);
  });
};

export const getLeads = (): Promise<Lead[]> => {
  return simulateNetworkRequest(leadsData as Lead[]);
};

export const updateLead = (id: string, updates: Partial<Lead>): Promise<Lead> => {
  const leadIndex = (leadsData as Lead[]).findIndex(lead => lead.id === id);
  
  if (leadIndex === -1) {
    return Promise.reject(new Error(`Lead with id ${id} not found`));
  }
  
  const updatedLead = {
    ...(leadsData as Lead[])[leadIndex],
    ...updates
  };
  
  return simulateNetworkRequest(updatedLead);
};

export const getOpportunities = (): Promise<Opportunity[]> => {
  return simulateNetworkRequest(opportunitiesData as Opportunity[]);
};

export const createOpportunity = (opportunity: Omit<Opportunity, 'id'>): Promise<Opportunity> => {
  const newId = `OPP${String(opportunitiesData.length + 1).padStart(3, '0')}`;
  
  const newOpportunity = {
    id: newId,
    ...opportunity
  };

  return simulateNetworkRequest(newOpportunity as Opportunity);
};
