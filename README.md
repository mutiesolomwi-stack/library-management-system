# Library Management System

A full-stack library management system built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **React (Vite)**.

## Schema Decisions
- **Relational vs. Embedded**: `Book` references `Genre` via a `genreId` foreign key rather than embedding genres directly. This normalizes genre names/slugs, avoids duplicate data updates across thousands of book records, and allows instant querying/indexing by genre.
- **Role-Based Access**: User `Role` enum (`PATRON`, `LIBRARIAN`) controls access to sensitive administrative actions like catalog modifications via `RolesGuard`.
- **Review Model**: Related to `Book` and `User` via foreign keys `bookId` and `userId` to enable relational rating and review aggregation.

## Features Built
- **Backend**: NestJS REST API with Prisma ORM, bcrypt password hashing, JWT Authentication, `@Roles()` guard, and full CRUD for Genres and Books with pagination and multi-field search.
- **Frontend**: React + Vite application with `BrowserRouter`, `ReadingListContext` (persisted to `localStorage` with reducer actions `ADD_BOOK`, `REMOVE_BOOK`, `CLEAR_LIST`), live debounced search (`SearchBar`), `BookGrid` with skeleton loaders, `BookDetail` view, `LoginPage`, `RegisterPage`, `ProtectedRoute`, and `SpaceBookingPage`.

## Setup & Running
1. **Backend**:
   ```bash
   cd api
   cp .env.example .env
   npm install
   npx prisma migrate dev --name init
   npx prisma db seed
   npm run start:dev
   ```
2. **Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```
