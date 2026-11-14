import React, { createContext, useReducer, useEffect, useContext } from 'react';

export const ReadingListContext = createContext();

const STORAGE_KEY = 'library_reading_list';

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK': {
      if (state.some((book) => book.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    }
    case 'REMOVE_BOOK': {
      return state.filter((book) => book.id !== action.payload);
    }
    case 'CLEAR_LIST': {
      return [];
    }
    case 'MERGE_LIST': {
      // Stretch goal: merge guest reading list with user list
      const existingIds = new Set(state.map((b) => b.id));
      const newItems = action.payload.filter((b) => !existingIds.has(b.id));
      return [...state, ...newItems];
    }
    default:
      return state;
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(readingListReducer, [], () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load reading list from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
    } catch (e) {
      console.error('Failed to save reading list to localStorage:', e);
    }
  }, [readingList]);

  return (
    <ReadingListContext.Provider value={{ readingList, dispatch }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error('useReadingList must be used within a ReadingListProvider');
  }
  return context;
}
