import React, { useEffect, useState } from 'react';

export default function MyBorrowRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/borrow-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setRequests(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>My Borrow Requests</h2>
      {loading ? <p>Loading requests...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Book Title</th>
              <th style={{ padding: '8px' }}>Author</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Fine</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>{req.bookTitle}</td>
                <td style={{ padding: '8px' }}>{req.bookAuthor}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem',
                    background: req.status === 'APPROVED' ? '#dcfce7' : req.status === 'RETURNED' ? '#e0f2fe' : '#fef3c7'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '8px' }}>${req.fineAmount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
