# Library Management System - Core API & Auth

A NestJS RESTful API for a library management system featuring Prisma ORM, PostgreSQL, JWT Authentication, Role-Based Access Control (RBAC), DTO Validation, Query Filtering, Pagination, and Rate Limiting.

## Project Structure

```text
library-management-system/
├── api/
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── prisma/
│       │   ├── prisma.module.ts
│       │   └── prisma.service.ts
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── jwt.strategy.ts
│       │   ├── jwt-auth.guard.ts
│       │   ├── roles.decorator.ts
│       │   ├── roles.guard.ts
│       │   └── dto/
│       │       ├── register.dto.ts
│       │       └── login.dto.ts
│       ├── genres/
│       │   ├── genres.module.ts
│       │   ├── genres.controller.ts
│       │   ├── genres.service.ts
│       │   └── dto/
│       │       ├── create-genre.dto.ts
│       │       └── update-genre.dto.ts
│       ├── books/
│       │   ├── books.module.ts
│       │   ├── books.controller.ts
│       │   ├── books.service.ts
│       │   └── dto/
│       │       ├── create-book.dto.ts
│       │       └── update-book.dto.ts
│       └── users/
│           ├── users.module.ts
│           ├── users.controller.ts
│           └── users.service.ts
└── docs/
    └── postman_collection.json
```

## Setup & Running Instructions

### 1. Installation
```bash
cd api
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set environment parameters:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/library_db?schema=public"
JWT_SECRET="app-jwt-secret-key"
PORT=3000
```

### 3. Migration & Seeding
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Server
```bash
npm run start:dev
```

---

## Schema Decisions & Architecture

### Why Book References Genre via Foreign Key vs Embedding
1. **Normalization & Single Source of Truth**: Referencing `genreId` via `@relation` keeps genre details in the `Genre` table. Updates to a genre propagate instantly without risks of data drift.
2. **Referential Integrity**: Relational foreign keys in PostgreSQL enforce data constraints, eliminating orphan records.
3. **Query Optimization**: Filtering books by `genreId` leverages indexed foreign keys for speed.

### Prisma vs. Document Databases Reflection
- **Prisma (Relational)**: Typed schema (`schema.prisma`) provides static compile-time typing and automatic runtime validation. Migrations keep database and client types synchronized.
- **Document Databases (NoSQL)**: Document stores embed related records directly. This avoids JOINs but introduces data duplication, update anomalies, and lack of strict constraints.

---

## Postman API Collection
Import `docs/postman_collection.json` into Postman to test all endpoints.
