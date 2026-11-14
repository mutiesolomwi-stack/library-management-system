import React, { useEffect, useState } from 'react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setBookings(data); setLoading(false); });
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Librarian Dashboard: Space Bookings</h2>
      {loading ? <p>Loading bookings...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Booking ID</th>
              <th style={{ padding: '8px' }}>User</th>
              <th style={{ padding: '8px' }}>Space</th>
              <th style={{ padding: '8px' }}>Date</th>
              <th style={{ padding: '8px' }}>Time Slot</th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px' }}>#{b.id}</td>
                <td style={{ padding: '8px' }}>{b.user?.name || b.userId}</td>
                <td style={{ padding: '8px' }}>{b.space?.name || b.spaceId}</td>
                <td style={{ padding: '8px' }}>{b.date}</td>
                <td style={{ padding: '8px' }}>{b.startTime} - {b.endTime}</td>
                <td style={{ padding: '8px' }}><span style={{ color: '#16a34a', fontWeight: 'bold' }}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
