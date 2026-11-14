import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { dispatch } = useReadingList();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/books/${id}`)
      .then(res => res.json())
      .then(data => { setBook(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBorrowRequest = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/borrow-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ bookId: Number(id) })
    })
      .then(res => {
        if (!res.ok) throw new Error('Borrow request failed');
        return res.json();
      })
      .then(() => setMessage('Borrow request submitted successfully!'))
      .catch(err => setMessage(err.message));
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading book details...</p>;
  if (!book) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Book not found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}>
      <h2>{book.title}</h2>
      <h4 style={{ color: '#64748b', marginTop: '-0.5rem' }}>by {book.author}</h4>
      <p><strong>Genre:</strong> {book.genre?.name}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}</p>

      {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '4px', margin: '1rem 0' }}>{message}</div>}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={handleBorrowRequest} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Borrow Request
        </button>
        <button onClick={() => dispatch({ type: 'ADD_BOOK', payload: book })} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Add to Reading List
        </button>
      </div>
    </div>
  );
}
