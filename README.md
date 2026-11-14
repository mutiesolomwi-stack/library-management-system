# Library Management System - Core Backend & React Frontend

Comprehensive Library Management System with Prisma ORM, PostgreSQL, NestJS backend, and React Vite frontend.

## Schema Decisions
We model `Book` with a foreign key reference (`genreId`) to `Genre` rather than embedding it to maintain proper third normal form (3NF), prevent data duplication across hundreds of books, allow easy genre updates in one place, and optimize database indexing.
Additionally, in `BorrowRequest`, we snapshot `bookTitle` and `bookAuthor` alongside `bookId` so historical borrow records remain accurate even if catalog titles are later updated or removed.

## Features
- **Prisma Schema**: User, Role, Genre, Book, Review, BorrowRequest (with BorrowStatus enum), Space, and Booking (with BookingStatus enum).
- **Borrow Tracking & Fines**: Pure `calculateFine` helper with Jest unit tests (`fine-calculator.spec.ts`).
- **Space Booking Conflict Check**: Server-side overlap checking (`startTime < existing.endTime AND endTime > existing.startTime`).
- **Auth & Authorization**: JWT Passport strategy, bcrypt password hashing, `@Roles('LIBRARIAN')` decorator, and `RolesGuard`.
- **React Frontend**: Debounced search, ReadingListContext reducer with localStorage persistence, Space booking form, Admin librarian dashboards.
