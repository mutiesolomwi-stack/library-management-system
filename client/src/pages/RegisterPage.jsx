import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'PATRON' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Registration failed');
        return res.json();
      })
      .then(data => {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      })
      .catch(err => setError(err.message));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h2>Register Account</h2>
      {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
        <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
          <option value="PATRON">Patron Account</option>
          <option value="LIBRARIAN">Librarian Account</option>
        </select>
        <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}
