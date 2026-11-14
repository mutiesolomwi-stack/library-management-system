import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { readingList, dispatch } = useReadingList();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Book not found');
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '40px', color: '#94a3b8' }}>Loading book details...</div>;
  if (error || !book) return <div className="container" style={{ padding: '40px', color: '#ef4444' }}>Error: {error || 'Book not found'}</div>;

  const isSaved = readingList.some((item) => item.id === book.id);

  const toggleReadingList = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE_BOOK', payload: book.id });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: book });
    }
  };

  return (
    <div className="container">
      <Link to="/" style={{ color: '#38bdf8', marginBottom: '20px', display: 'inline-block' }}>← Back to Catalog</Link>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            {book.genre && (
              <span style={{ backgroundColor: '#334155', color: '#38bdf8', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                {book.genre.name}
              </span>
            )}
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '12px' }}>{book.title}</h1>
            <p style={{ fontSize: '18px', color: '#94a3b8', marginTop: '4px' }}>by {book.author}</p>
          </div>
          <button
            onClick={toggleReadingList}
            className={isSaved ? 'btn-danger' : 'btn-primary'}
            style={{ padding: '10px 20px', fontSize: '15px' }}
          >
            {isSaved ? 'Remove from Reading List' : '+ Add to Reading List'}
          </button>
        </div>

        <hr style={{ borderColor: '#334155', margin: '24px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '13px' }}>ISBN</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{book.isbn}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', fontSize: '13px' }}>Availability</p>
            <p style={{ fontSize: '16px', fontWeight: '500', color: book.totalCopies > 0 ? '#22c55e' : '#ef4444' }}>
              {book.totalCopies} Total Copies
            </p>
          </div>
        </div>

        {book.reviews && book.reviews.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Patron Reviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {book.reviews.map((r) => (
                <div key={r.id} style={{ backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>{r.user?.name || 'Anonymous'}</span>
                    <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
