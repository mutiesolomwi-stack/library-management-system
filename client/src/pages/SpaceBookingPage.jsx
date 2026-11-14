import React, { useState } from 'react';

export default function SpaceBookingPage() {
  const [form, setForm] = useState({
    spaceId: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ maxWidth: '560px' }}>
      <div className="card">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Book a Study Space</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Reserve private study rooms, quiet desks, or collaboration spaces.
        </p>

        {submitted ? (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: '#22c55e', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Booking Request Received!</h3>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>
              Your reservation request for space <strong>{form.spaceId}</strong> on <strong>{form.date}</strong> ({form.startTime} - {form.endTime}) has been logged.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary"
              style={{ marginTop: '16px' }}
            >
              Book Another Space
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Study Space</label>
              <select
                name="spaceId"
                className="select-field"
                value={form.spaceId}
                onChange={handleChange}
                required
              >
                <option value="">Select a study space</option>
                <option value="Room A (Quiet Study - 4 seats)">Room A (Quiet Study - 4 seats)</option>
                <option value="Room B (Group Collab - 8 seats)">Room B (Group Collab - 8 seats)</option>
                <option value="Desk 101 (Individual Silent Desk)">Desk 101 (Individual Silent Desk)</option>
                <option value="Media Suite (Projector & Audio)">Media Suite (Projector & Audio)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Date</label>
              <input
                type="date"
                name="date"
                className="input-field"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  className="input-field"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  className="input-field"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: '12px' }}>
              Request Space Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
