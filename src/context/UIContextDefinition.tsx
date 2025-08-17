import { createContext } from 'react';
import type { SortConfig, FilterConfig } from '../types';

interface UIContextType {
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  filterConfig: FilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterConfig>>;
}

export const UIContext = createContext<UIContextType>({} as UIContextType);
