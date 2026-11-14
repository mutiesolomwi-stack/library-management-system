import React, { createContext, useReducer, useEffect, useContext } from 'react';

const ReadingListContext = createContext();

const initialState = JSON.parse(localStorage.getItem('readingList') || '[]');

function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      if (state.some(b => b.id === action.payload.id)) return state;
      return [...state, action.payload];
    case 'REMOVE_BOOK':
      return state.filter(b => b.id !== action.payload);
    case 'CLEAR_LIST':
      return [];
    case 'MERGE_LIST':
      const existingIds = new Set(state.map(b => b.id));
      const newItems = action.payload.filter(b => !existingIds.has(b.id));
      return [...state, ...newItems];
    default:
      return state;
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(readingListReducer, initialState);

  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]);

  return (
    <ReadingListContext.Provider value={{ readingList, dispatch }}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  return useContext(ReadingListContext);
}

export default { ReadingListProvider, useReadingList };
