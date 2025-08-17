import { useCallback } from 'react';
import { useSortConfig } from '../context/useUIContext';

export function useTableSort<T>() {
  const { sortConfig, setSortConfig } = useSortConfig();
  
  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(prevConfig => ({
      key: key as any,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  }, [setSortConfig]);
  
  const sortData = useCallback((data: T[]) => {
    if (!data.length) return data;
    
    const { key, direction } = sortConfig;
    const order = direction === 'asc' ? 1 : -1;
    
    return [...data].sort((a, b) => {
      const aValue = a[key as keyof T];
      const bValue = b[key as keyof T];
      
      if (aValue === bValue) return 0;
      return aValue > bValue ? order : -order;
    });
  }, [sortConfig]);
  
  const renderSortIndicator = useCallback((key: keyof T) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  }, [sortConfig]);

  return {
    sortConfig,
    handleSort,
    sortData,
    renderSortIndicator
  };
}
