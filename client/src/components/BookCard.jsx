import React from 'react';
import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function BookCard({ book }) {
  const { readingList, dispatch } = useReadingList();
  const isSaved = readingList.some(b => b.id === book.id);

  const toggleSave = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE_BOOK', payload: book.id });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }
  };

  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '1.25rem',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
    }}>
      <div>
        {book.genre && (
          <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px' }}>
            {book.genre.name}
          </span>
        )}
        <h3 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.15rem' }}>{book.title}</h3>
        <p style={{ margin: '0 0 0.75rem 0', color: '#64748b', fontSize: '0.9rem' }}>by {book.author}</p>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Link to={`/books/${book.id}`} style={{
          flex: 1,
          textAlign: 'center',
          background: '#0284c7',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '0.9rem',
        }}>
          Details
        </Link>
        <button onClick={toggleSave} style={{
          background: isSaved ? '#fecaca' : '#f1f5f9',
          color: isSaved ? '#991b1b' : '#334155',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
        }}>
          {isSaved ? '♥ Saved' : '♡ Add'}
        </button>
      </div>
    </div>
  );
}
