import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';

export default function BookGrid({ genreId, search, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    if (genreId) queryParams.append('genreId', genreId);
    if (search) queryParams.append('search', search);
    if (sortBy) queryParams.append('sortBy', sortBy);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/books?${queryParams.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch catalog');
        return res.json();
      })
      .then(data => {
        setBooks(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [genreId, search, sortBy]);

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {[1, 2, 3, 4].map(n => (
          <div key={n} style={{ height: '160px', background: '#f1f5f9', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
    );
  }

  if (error) return <div style={{ color: '#ef4444', margin: '2rem 0' }}>Error: {error}</div>;

  if (books.length === 0) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No books found matching your filter criteria.</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
