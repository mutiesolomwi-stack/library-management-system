import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function Navbar() {
  const { readingList } = useReadingList();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#1e293b', padding: '1rem 2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none' }}>
        📚 Library Portal
      </Link>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Catalog</Link>
        <Link to="/reading-list" style={{ color: '#e2e8f0', textDecoration: 'none', position: 'relative' }}>
          Reading List
          {readingList.length > 0 && (
            <span style={{ marginLeft: '6px', background: '#ef4444', color: '#fff', borderRadius: '50%', padding: '2px 7px', fontSize: '0.75rem' }}>
              {readingList.length}
            </span>
          )}
        </Link>
        {token && <Link to="/space-booking" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Book Space</Link>}
        {token && <Link to="/my-requests" style={{ color: '#e2e8f0', textDecoration: 'none' }}>My Borrow Requests</Link>}
        
        {user?.role === 'LIBRARIAN' && (
          <>
            <Link to="/admin/borrow-requests" style={{ color: '#f59e0b', fontWeight: '600', textDecoration: 'none' }}>[Admin] Borrows</Link>
            <Link to="/admin/bookings" style={{ color: '#f59e0b', fontWeight: '600', textDecoration: 'none' }}>[Admin] Bookings</Link>
          </>
        )}

        {token ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={{ background: '#334155', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" style={{ color: '#fff', background: '#0284c7', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: '#cbd5e1', border: '1px solid #475569', padding: '6px 12px', borderRadius: '4px', textDecoration: 'none' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
