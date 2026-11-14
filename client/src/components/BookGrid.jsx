import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

export default function BookGrid({ genreId, search, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const params = new URLSearchParams();
    if (genreId) params.append('genreId', genreId);
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);

    fetch(`${apiUrl}/books?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load catalog');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setBooks(data.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [genreId, search, sortBy]);

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="card" style={{ height: '220px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="skeleton" style={{ height: '20px', width: '40%' }}></div>
            <div className="skeleton" style={{ height: '24px', width: '80%' }}></div>
            <div className="skeleton" style={{ height: '16px', width: '60%' }}></div>
            <div className="skeleton" style={{ height: '36px', width: '100%', marginTop: 'auto' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px', borderColor: '#ef4444' }}>
        <p style={{ color: '#ef4444', fontSize: '18px', fontWeight: 'bold' }}>Error Loading Catalog</p>
        <p style={{ color: '#94a3b8', marginTop: '8px' }}>{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '18px', color: '#94a3b8' }}>No books found matching your criteria.</p>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '8px' }}>Try adjusting your search terms or genre filter.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
