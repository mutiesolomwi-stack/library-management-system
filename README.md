# Library Management System - Data Layer

This repository contains the backend data layer design and Prisma schema implementation for the **Library Management System**, built with **NestJS**, **Prisma ORM**, and **PostgreSQL**.

---

## 🛠 Project Structure

```text
library-management-system/
├── README.md
└── api/
    ├── .env.example
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    └── src/
        └── prisma/
            └── prisma.service.ts
```

---

## 📐 Schema Decisions

### Why `Book` References `Genre` via Foreign Key (`genreId`)

In designing the catalog schema, we intentionally modeled `Genre` as a separate table referenced by `Book` using a `genreId` foreign key with Prisma's `@relation` attribute, rather than embedding genre information directly into the `Book` model:

1. **Normalization & Data Integrity (Single Source of Truth):**
   Genres represent distinct entity definitions shared across hundreds or thousands of books. By normalizing `Genre` into its own table with unique constraints on `name` and `slug`, updating a genre (e.g., renaming "Sci-Fi" to "Science Fiction") requires a single update to the `Genre` table rather than updating thousands of individual book records.
2. **Referential Integrity:**
   Using a relational database foreign key (`genreId`) enforced by PostgreSQL and Prisma guarantees that a book cannot refer to a non-existent genre ID, eliminating orphaned records and typo-based data corruption.
3. **Query Optimization & Indexing:**
   Integer foreign keys (`genreId`) indexed in PostgreSQL allow fast, efficient relational joins (`JOIN` / Prisma `include: { genre: true }`) and filtering across large library catalogs.

---

## 💡 Reflection: Modeling in Prisma (Relational) vs. Document Databases

- **Strict Schema Enforcement vs. Flexible Schemas:** 
  In a document database (such as MongoDB), entities are often embedded directly inside documents or referenced loosely without strict database-level schema constraints. While document stores offer high write flexibility, data structures can quietly drift over time.
- **Prisma as the Single Source of Truth:** 
  Modeling in Prisma requires defining models explicitly in `schema.prisma`. Running `npx prisma migrate dev` generates both SQL database migrations and TypeScript types simultaneously. This ensures strict compile-time type-safety across the entire NestJS application—so database schema, NestJS service logic, and editor autocompletion never get out of sync.

---

## 🚀 Setup & Execution Instructions

1. **Environment Configuration:**
   Copy `.env.example` to `.env` inside the `api` folder and supply your PostgreSQL connection string:
   ```bash
   cp api/.env.example api/.env
   ```

2. **Run Migrations:**
   Apply schema migrations to your PostgreSQL database:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Run Seed Script:**
   Populate the database with initial genres, books, users, and reviews:
   ```bash
   npx prisma db seed
   ```
