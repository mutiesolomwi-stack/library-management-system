import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/genres`)
      .then(res => res.json())
      .then(data => setGenres(data || []))
      .catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Library Catalog</h2>
      <SearchBar onSearch={setSearch} />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <select value={genreId} onChange={e => setGenreId(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
          <option value="">Sort By</option>
          <option value="title">Title (A-Z)</option>
          <option value="author">Author (A-Z)</option>
        </select>
      </div>

      <BookGrid genreId={genreId} search={search} sortBy={sortBy} />
    </div>
  );
}
