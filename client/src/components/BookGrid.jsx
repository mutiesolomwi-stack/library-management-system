import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse flex flex-col justify-between h-52">
      <div>
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
      </div>
      <div className="h-4 bg-slate-200 rounded w-1/3 mt-4"></div>
    </div>
  );
}

function BookGrid({ genreId, search, sortBy }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const params = {};
    if (genreId) params.genreId = genreId;
    if (search) params.search = search;
    if (sortBy) params.sortBy = sortBy;

    axios
      .get(`${apiUrl}/books`, { params })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.items || [];
        setBooks(data);
      })
      .catch((err) => {
        console.error('Failed to fetch books:', err);
        setError('Failed to load catalog books. Please check your backend connection.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [genreId, search, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-center text-red-700">
        <p className="font-semibold mb-1">Error Loading Books</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-slate-200 rounded-xl shadow-sm">
        <span className="text-4xl mb-3 block">📖</span>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No books found</h3>
        <p className="text-sm text-slate-500">
          Try adjusting your search query or selecting a different genre filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
