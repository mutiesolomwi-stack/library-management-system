import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(term);
    }, 400);

    return () => clearTimeout(timer);
  }, [term, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search books by title or author..."
      value={term}
      onChange={e => setTerm(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 14px',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        marginBottom: '1rem',
      }}
    />
  );
}
