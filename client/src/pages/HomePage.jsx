import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import BookGrid from '../components/BookGrid';

function HomePage() {
  const [search, setSearch] = useState('');
  const [genreId, setGenreId] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    axios
      .get(`${apiUrl}/genres`)
      .then((res) => setGenres(res.data))
      .catch((err) => console.error('Failed to load genres:', err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Explore Our Catalog
        </h1>
        <p className="text-sm text-slate-600">
          Browse through genres or search live by book title or author.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6">
            <SearchBar onSearch={(q) => setSearch(q)} />
          </div>

          <div className="md:col-span-3">
            <select
              className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Sort by Title (A-Z)</option>
              <option value="author">Sort by Author (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <BookGrid genreId={genreId} search={search} sortBy={sortBy} />
    </div>
  );
}

export default HomePage;
