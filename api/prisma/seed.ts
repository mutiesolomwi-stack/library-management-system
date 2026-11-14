import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'librarian@library.com',
      name: 'Head Librarian',
      password: passwordHash,
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: 'patron@library.com',
      name: 'Jane Reader',
      password: passwordHash,
      role: Role.PATRON,
    },
  });

  const fiction = await prisma.genre.create({ data: { name: 'Fiction', slug: 'fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction', slug: 'sci-fi' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery', slug: 'mystery' } });
  const nonFiction = await prisma.genre.create({ data: { name: 'Non-Fiction', slug: 'non-fiction' } });
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy', slug: 'fantasy' } });

  const booksData = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 5, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 4, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 6, genreId: sciFi.id },
    { title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', totalCopies: 3, genreId: sciFi.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', totalCopies: 7, genreId: sciFi.id },
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', totalCopies: 4, genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', totalCopies: 5, genreId: mystery.id },
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '9780062316097', totalCopies: 8, genreId: nonFiction.id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', totalCopies: 4, genreId: nonFiction.id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', totalCopies: 10, genreId: fantasy.id },
    { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', isbn: '9780547928210', totalCopies: 6, genreId: fantasy.id },
    { title: 'Harry Potter and the Sorcerer's Stone', author: 'J.K. Rowling', isbn: '9780590353427', totalCopies: 12, genreId: fantasy.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', totalCopies: 5, genreId: fiction.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569564', totalCopies: 3, genreId: sciFi.id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', totalCopies: 9, genreId: nonFiction.id },
    { title: 'The Cuckoo's Calling', author: 'Robert Galbraith', isbn: '9780316206846', totalCopies: 4, genreId: mystery.id },
  ];

  for (const b of booksData) {
    const createdBook = await prisma.book.create({ data: b });
    if (b.title === 'Dune') {
      await prisma.review.create({
        data: {
          rating: 5,
          comment: 'Masterpiece of sci-fi world-building!',
          bookId: createdBook.id,
          userId: patron.id,
        },
      });
    }
  }

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.();
  });
