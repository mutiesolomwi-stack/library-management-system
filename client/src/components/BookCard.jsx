import React from 'react';
import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function BookCard({ book }) {
  const { readingList, dispatch } = useReadingList();
  const isSaved = readingList.some((item) => item.id === book.id);

  const toggleReadingList = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE_BOOK', payload: book.id });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        {book.genre && (
          <span style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            backgroundColor: '#334155',
            color: '#38bdf8',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}>
            {book.genre.name}
          </span>
        )}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '6px', color: '#f8fafc' }}>{book.title}</h3>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>by {book.author}</p>
        <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '16px' }}>ISBN: {book.isbn}</p>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: book.totalCopies > 0 ? '#22c55e' : '#ef4444', fontWeight: '500' }}>
            {book.totalCopies > 0 ? `Available (${book.totalCopies} copies)` : 'Out of Stock'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/books/${book.id}`} style={{ flex: 1 }}>
            <button style={{ width: '100%', backgroundColor: '#334155', color: 'white' }}>View Details</button>
          </Link>
          <button
            onClick={toggleReadingList}
            className={isSaved ? 'btn-danger' : 'btn-primary'}
            style={{ fontSize: '13px', padding: '8px 12px' }}
          >
            {isSaved ? 'Remove' : '+ List'}
          </button>
        </div>
      </div>
    </div>
  );
}
