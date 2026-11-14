import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ReadingListProvider } from './context/ReadingListContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SpaceBookingPage from './pages/SpaceBookingPage';
import ReadingListPage from './pages/ReadingListPage';

export default function App() {
  return (
    <ReadingListProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reading-list" element={<ReadingListPage />} />
            <Route
              path="/space-booking"
              element={
                <ProtectedRoute>
                  <SpaceBookingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </ReadingListProvider>
  );
}
