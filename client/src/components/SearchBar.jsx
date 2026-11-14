import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <div style={{ flex: 1 }}>
      <input
        type="text"
        className="input-field"
        placeholder="🔍 Live search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
