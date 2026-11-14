import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SpaceBookingPage from './pages/SpaceBookingPage';
import MyBorrowRequests from './pages/MyBorrowRequests';
import AdminBorrowRequests from './pages/AdminBorrowRequests';
import AdminBookings from './pages/AdminBookings';
import ReadingListContext from './context/ReadingListContext';

const { ReadingListProvider } = ReadingListContext;

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token) return <p style={{ textAlign: 'center', margin: '3rem' }}>Please log in to access this page.</p>;
  if (role && user.role !== role) return <p style={{ textAlign: 'center', margin: '3rem' }}>Access Denied: Librarian privileges required.</p>;
  return children;
}

export default function App() {
  return (
    <ReadingListProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/space-booking" element={<ProtectedRoute><SpaceBookingPage /></ProtectedRoute>} />
        <Route path="/my-requests" element={<ProtectedRoute><MyBorrowRequests /></ProtectedRoute>} />
        <Route path="/admin/borrow-requests" element={<ProtectedRoute role="LIBRARIAN"><AdminBorrowRequests /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute role="LIBRARIAN"><AdminBookings /></ProtectedRoute>} />
      </Routes>
    </ReadingListProvider>
  );
}
