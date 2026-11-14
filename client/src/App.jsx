import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors flex items-center gap-2">
            📚 Library Catalog
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/" className="px-3 py-1.5 rounded-md hover:bg-indigo-600 transition-colors text-sm font-medium">
              Home Catalog
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm border-t border-slate-700">
        <p>© 2026 Library Management System. Built with NestJS, Prisma & React.</p>
      </footer>
    </div>
  );
}

export default App;
