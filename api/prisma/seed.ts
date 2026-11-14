import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing records
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Genres (5 genres total, exceeding 4+ requirement)
  const fiction = await prisma.genre.create({
    data: { name: 'Fiction', slug: 'fiction' },
  });
  const sciFi = await prisma.genre.create({
    data: { name: 'Science Fiction', slug: 'science-fiction' },
  });
  const mystery = await prisma.genre.create({
    data: { name: 'Mystery & Thriller', slug: 'mystery-thriller' },
  });
  const nonFiction = await prisma.genre.create({
    data: { name: 'Non-Fiction', slug: 'non-fiction' },
  });
  const fantasy = await prisma.genre.create({
    data: { name: 'Fantasy', slug: 'fantasy' },
  });

  // 2. Create Users (Patron & Librarian)
  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@library.com',
      name: 'Head Librarian',
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: 'patron@example.com',
      name: 'John Doe',
      role: Role.PATRON,
    },
  });

  // 3. Create Books (16 books total, exceeding 15+ requirement)
  const booksData = [
    // Fiction (3 books)
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 5, availableCopies: 5, genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 3, availableCopies: 2, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 6, availableCopies: 4, genreId: fiction.id },

    // Science Fiction (4 books)
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', totalCopies: 4, availableCopies: 4, genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569560', totalCopies: 2, availableCopies: 1, genreId: sciFi.id },
    { title: 'Foundation', author: 'Isaac Asimov', isbn: '9780553293357', totalCopies: 3, availableCopies: 3, genreId: sciFi.id },
    { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', isbn: '9780441478125', totalCopies: 2, availableCopies: 2, genreId: sciFi.id },

    // Mystery & Thriller (3 books)
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', totalCopies: 4, availableCopies: 3, genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', totalCopies: 3, availableCopies: 1, genreId: mystery.id },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307949486', totalCopies: 4, availableCopies: 4, genreId: mystery.id },

    // Non-Fiction (3 books)
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '9780062316097', totalCopies: 5, availableCopies: 5, genreId: nonFiction.id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', totalCopies: 8, availableCopies: 6, genreId: nonFiction.id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', totalCopies: 3, availableCopies: 2, genreId: nonFiction.id },

    // Fantasy (3 books)
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', totalCopies: 5, availableCopies: 4, genreId: fantasy.id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', totalCopies: 3, availableCopies: 3, genreId: fantasy.id },
    { title: 'A Game of Thrones', author: 'George R.R. Martin', isbn: '9780553573404', totalCopies: 4, availableCopies: 2, genreId: fantasy.id },
  ];

  for (const book of booksData) {
    await prisma.book.create({ data: book });
  }

  // 4. Create Sample Review (Stretch Goal)
  const duneBook = await prisma.book.findFirst({ where: { isbn: '9780441172719' } });
  if (duneBook) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'An epic sci-fi masterpiece with unparalleled world-building!',
        bookId: duneBook.id,
        userId: patron.id,
      },
    });
  }

  console.log('✅ Seeding completed: 5 Genres, 16 Books, 2 Users, and 1 Review inserted.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
