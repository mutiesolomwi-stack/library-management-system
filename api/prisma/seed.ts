import { PrismaClient, Role, BorrowStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await prisma.booking.deleteMany();
  await prisma.borrowRequest.deleteMany();
  await prisma.space.deleteMany();
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const patron = await prisma.user.create({
    data: { email: 'patron@library.org', password: hashedPassword, name: 'Mutie Patron', role: Role.PATRON },
  });

  const librarian = await prisma.user.create({
    data: { email: 'librarian@library.org', password: hashedPassword, name: 'Mutie Librarian', role: Role.LIBRARIAN },
  });

  const genresData = [
    { name: 'Fiction', slug: 'fiction' },
    { name: 'Science Fiction', slug: 'sci-fi' },
    { name: 'Mystery', slug: 'mystery' },
    { name: 'Non-Fiction', slug: 'non-fiction' },
    { name: 'Fantasy', slug: 'fantasy' },
  ];

  const genres = [];
  for (const g of genresData) {
    const created = await prisma.genre.create({ data: g });
    genres.push(created);
  }

  const books = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genreId: genres[0].id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', genreId: genres[1].id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreId: genres[0].id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreId: genres[1].id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', genreId: genres[4].id },
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', genreId: genres[2].id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreId: genres[3].id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', genreId: genres[3].id },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', genreId: genres[0].id },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '9781451673319', genreId: genres[1].id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569560', genreId: genres[1].id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', genreId: genres[2].id },
    { title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '9781250301697', genreId: genres[2].id },
    { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', genreId: genres[3].id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', genreId: genres[4].id },
  ];

  for (const b of books) {
    await prisma.book.create({ data: { ...b, totalCopies: 3, availableCopies: 3 } });
  }

  const space1 = await prisma.space.create({ data: { name: 'Study Room A', capacity: 4, description: 'Quiet group room with whiteboard' } });
  const space2 = await prisma.space.create({ data: { name: 'Innovation Lab', capacity: 8, description: 'Tech room with display monitors' } });

  await prisma.borrowRequest.create({
    data: {
      userId: patron.id,
      bookId: 1,
      bookTitle: 'To Kill a Mockingbird',
      bookAuthor: 'Harper Lee',
      status: BorrowStatus.REQUESTED,
    }
  });

  await prisma.booking.create({
    data: {
      userId: patron.id,
      spaceId: space1.id,
      date: '2026-11-20',
      startTime: '10:00',
      endTime: '12:00',
    }
  });

  console.log('Seeding completed successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
