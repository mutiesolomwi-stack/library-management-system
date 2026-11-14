import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

export default function HomePage() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data || []))
      .catch((err) => console.error('Failed to fetch genres:', err));
  }, []);

  return (
    <div className="container">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Explore Library Catalog</h1>
        <p style={{ color: '#94a3b8' }}>Search books, filter by genre, and add items to your reading list.</p>
      </header>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        <SearchBar onSearch={setSearchQuery} />

        <div style={{ minWidth: '180px' }}>
          <select
            className="select-field"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: '160px' }}>
          <select
            className="select-field"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Title</option>
            <option value="author">Sort by Author</option>
          </select>
        </div>
      </div>

      <BookGrid genreId={selectedGenre} search={searchQuery} sortBy={sortBy} />
    </div>
  );
}
