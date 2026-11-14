import React, { useEffect, useState } from 'react';

export default function AdminBorrowRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/borrow-requests`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setRequests(data); setLoading(false); });
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/borrow-requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    }).then(() => fetchRequests());
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Librarian Dashboard: Manage Borrow Requests</h2>
      {loading ? <p>Loading requests...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>ID</th>
              <th style={{ padding: '8px' }}>Patron</th>
              <th style={{ padding: '8px' }}>Book Title</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Fine Amount</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>#{r.id}</td>
                <td style={{ padding: '8px' }}>{r.user?.name || r.userId}</td>
                <td style={{ padding: '8px' }}>{r.bookTitle}</td>
                <td style={{ padding: '8px' }}><strong>{r.status}</strong></td>
                <td style={{ padding: '8px' }}>${r.fineAmount || 0}</td>
                <td style={{ padding: '8px', display: 'flex', gap: '6px' }}>
                  {r.status === 'REQUESTED' && (
                    <>
                      <button onClick={() => handleUpdateStatus(r.id, 'APPROVED')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Approve</button>
                      <button onClick={() => handleUpdateStatus(r.id, 'REJECTED')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Reject</button>
                    </>
                  )}
                  {r.status === 'APPROVED' && (
                    <button onClick={() => handleUpdateStatus(r.id, 'BORROWED')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Mark Borrowed</button>
                  )}
                  {r.status === 'BORROWED' && (
                    <button onClick={() => handleUpdateStatus(r.id, 'RETURNED')} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Mark Returned</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
