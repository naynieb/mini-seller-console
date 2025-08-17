export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'New' | 'Contacted' | 'Qualified';
}

export type OpportunityStage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Closed';

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof Lead;
  direction: SortDirection;
}

export interface FilterConfig {
  status: string | null;
  searchTerm: string;
}

export interface StorageState {
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
}
