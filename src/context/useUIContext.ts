import { useContext } from 'react';
import { UIContext } from './UIContextDefinition';

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

export const useSortConfig = () => {
  const { sortConfig, setSortConfig } = useUIContext();
  return { sortConfig, setSortConfig };
};

export const useFilterConfig = () => {
  const { filterConfig, setFilterConfig } = useUIContext();
  return { filterConfig, setFilterConfig };
};
