# Library Management System - Full Stack (NestJS + Prisma + React)

This repository contains the full-stack NestJS backend and React Vite frontend for the Library Management System.

## Schema Decisions
We selected a **relational reference** for `Book` to `Genre` via a foreign key `genreId` (@relation) rather than embedding Genre within Book documents. 
- **Normalization**: Preserves single-source-of-truth for genre names and metadata across thousands of books.
- **Maintainability**: Updating a genre name occurs in one place rather than requiring mass document updates.
- **Relational Integrity**: Foreign key constraints prevent orphaned records or inconsistent genre strings.

## Frontend Architecture
- **React + Vite**: Fast SPA bundle with client-side routing via `react-router-dom`.
- **Debounced Search**: `SearchBar.jsx` debounces keystrokes with `setTimeout` and cleanup `clearTimeout` (400ms delay).
- **Lifting State Up**: `HomePage` holds search, genre filter, and sort state, passing values to `BookGrid` and callbacks to filter controls.
- **Skeleton UI**: `BookGrid` and `BookDetail` render animated skeleton cards during loading states.

## Getting Started

### 1. Backend Setup
```bash
cd api
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
