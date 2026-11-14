import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

export default function Navbar() {
  const { readingList } = useReadingList();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '16px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>
          📚 Library Management System
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#f8fafc', fontWeight: '500' }}>Catalog</Link>
          <Link to="/space-booking" style={{ color: '#f8fafc', fontWeight: '500' }}>Space Booking</Link>
          <Link to="/reading-list" style={{ position: 'relative', color: '#f8fafc', fontWeight: '500' }}>
            Reading List
            {readingList.length > 0 && (
              <span style={{
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '12px',
                marginLeft: '6px',
                fontWeight: 'bold',
              }}>
                {readingList.length}
              </span>
            )}
          </Link>
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>Hi, {user?.name || 'User'}</span>
              <button onClick={handleLogout} className="btn-danger" style={{ fontSize: '13px', padding: '6px 12px' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login">
                <button style={{ backgroundColor: '#334155', color: 'white', padding: '6px 14px' }}>Login</button>
              </Link>
              <Link to="/register">
                <button className="btn-primary" style={{ padding: '6px 14px' }}>Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
