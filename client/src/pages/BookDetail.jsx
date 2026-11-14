import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    axios
      .get(`${apiUrl}/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch book detail:', err);
        setError('Book not found or failed to load details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white border border-slate-200 rounded-xl shadow-sm animate-pulse space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        <div className="h-24 bg-slate-100 rounded w-full"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
        <h2 className="text-xl font-bold text-red-600 mb-2">Book Not Found</h2>
        <p className="text-sm text-slate-600 mb-4">{error || 'Unable to retrieve requested book.'}</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-colors"
        >
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        ← Back to Catalog
      </Link>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
              {book.genre?.name || 'General'}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              {book.title}
            </h1>
            <p className="text-lg text-slate-600 mt-1">
              by <span className="font-semibold text-slate-800">{book.author}</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600 block">
              {book.totalCopies}
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Total Copies
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 text-sm text-slate-600">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-xs font-semibold text-slate-400 uppercase">ISBN</span>
            <span className="font-mono font-medium text-slate-800">{book.isbn}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="block text-xs font-semibold text-slate-400 uppercase">Availability Status</span>
            <span className="font-medium text-emerald-600">
              {book.totalCopies > 0 ? 'Available for Checkout' : 'Currently Unavailable'}
            </span>
          </div>
        </div>

        {book.reviews && book.reviews.length > 0 && (
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Patron Reviews ({book.reviews.length})</h3>
            <div className="space-y-3">
              {book.reviews.map((r) => (
                <div key={r.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm text-slate-800">{r.user?.name || 'Patron'}</span>
                    <span className="text-yellow-500 text-sm">{'⭐'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-sm text-slate-600">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
