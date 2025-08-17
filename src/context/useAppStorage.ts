import type { StorageState } from '../types';

const STORAGE_KEY = 'sellerConsoleState';

const defaultState: StorageState = {
  sortConfig: { key: 'score', direction: 'desc' },
  filterConfig: { status: null, searchTerm: '' }
};

export const loadState = (): StorageState => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (storedState) {
      return JSON.parse(storedState);
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  
  return defaultState;
};

export const saveState = (state: StorageState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};
