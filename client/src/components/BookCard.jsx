import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100">
            {book.genre?.name || 'General'}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {book.totalCopies > 0 ? `${book.totalCopies} copies` : 'Out of Stock'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-slate-600 mb-3">
          by <span className="font-medium text-slate-800">{book.author}</span>
        </p>
        <p className="text-xs text-slate-400 font-mono">ISBN: {book.isbn}</p>
      </div>

      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/books/${book.id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
