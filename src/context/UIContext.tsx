import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { SortConfig, FilterConfig } from '../types';
import { loadState, saveState } from './useAppStorage';
import { UIContext } from './UIContextDefinition';

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const savedState = loadState();
  
  const [sortConfig, setSortConfig] = useState<SortConfig>(savedState.sortConfig);
  const [filterConfig, setFilterConfig] = useState<FilterConfig>(savedState.filterConfig);
  
  useEffect(() => {
    saveState({
      sortConfig,
      filterConfig
    });
  }, [sortConfig, filterConfig]);
  
  const value = useMemo(() => ({
    sortConfig,
    setSortConfig,
    filterConfig,
    setFilterConfig
  }), [sortConfig, filterConfig]);
  
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
