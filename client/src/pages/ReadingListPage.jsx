import React from 'react';
import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';
import BookCard from '../components/BookCard';

export default function ReadingListPage() {
  const { readingList, dispatch } = useReadingList();

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>My Saved Reading List</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Books saved for offline reference or upcoming checkout requests.</p>
        </div>
        {readingList.length > 0 && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_LIST' })}
            className="btn-danger"
            style={{ fontSize: '13px' }}
          >
            Clear Entire List
          </button>
        )}
      </div>

      {readingList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '12px' }}>Your reading list is currently empty.</p>
          <Link to="/">
            <button className="btn-primary">Browse Catalog to Add Books</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {readingList.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
