import React, { useState, useEffect } from 'react';

export default function SpaceBookingPage() {
  const [spaces, setSpaces] = useState([]);
  const [formData, setFormData] = useState({ spaceId: '', date: '', startTime: '09:00', endTime: '11:00' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/bookings/spaces`)
      .then(res => res.json())
      .then(data => {
        setSpaces(data || []);
        if (data && data.length > 0) setFormData(prev => ({ ...prev, spaceId: data[0].id }));
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        spaceId: Number(formData.spaceId),
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
      }),
    })
      .then(async res => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.message || 'Space booking conflict');
        return body;
      })
      .then(() => setMessage('Space successfully reserved!'))
      .catch(err => setError(err.message));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff' }}>
      <h2>Book a Study Space</h2>
      {message && <div style={{ background: '#dcfce7', color: '#166534', padding: '10px', borderRadius: '4px', marginBottom: '1rem' }}>{message}</div>}
      {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Select Space:</label>
          <select value={formData.spaceId} onChange={e => setFormData({ ...formData, spaceId: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
            {spaces.map(s => (
              <option key={s.id} value={s.id}>{s.name} (Cap: {s.capacity})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>Date:</label>
          <input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Start Time:</label>
            <input type="time" required value={formData.startTime} onChange={e => setFormData({ ...formData, startTime: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>End Time:</label>
            <input type="time" required value={formData.endTime} onChange={e => setFormData({ ...formData, endTime: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' }}>
          Reserve Space
        </button>
      </form>
    </div>
  );
}
