import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding library database...');

  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@library.com',
      password: hashedPassword,
      name: 'Sarah Chief Librarian',
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: 'patron@library.com',
      password: hashedPassword,
      name: 'John Patron',
      role: Role.PATRON,
    },
  });

  const fiction = await prisma.genre.create({ data: { name: 'Fiction', slug: 'fiction' } });
  const sciFi = await prisma.genre.create({ data: { name: 'Science Fiction', slug: 'science-fiction' } });
  const mystery = await prisma.genre.create({ data: { name: 'Mystery', slug: 'mystery' } });
  const nonFiction = await prisma.genre.create({ data: { name: 'Non-Fiction', slug: 'non-fiction' } });
  const fantasy = await prisma.genre.create({ data: { name: 'Fantasy', slug: 'fantasy' } });

  const books = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 5, availableCopies: 5, genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 4, availableCopies: 4, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 6, availableCopies: 6, genreId: sciFi.id },
    { title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', totalCopies: 3, availableCopies: 3, genreId: sciFi.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', totalCopies: 8, availableCopies: 8, genreId: sciFi.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569560', totalCopies: 4, availableCopies: 4, genreId: sciFi.id },
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', totalCopies: 5, availableCopies: 5, genreId: mystery.id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', totalCopies: 3, availableCopies: 3, genreId: mystery.id },
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', isbn: '9780307949486', totalCopies: 4, availableCopies: 4, genreId: mystery.id },
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '9780062316097', totalCopies: 7, availableCopies: 7, genreId: nonFiction.id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', totalCopies: 5, availableCopies: 5, genreId: nonFiction.id },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', isbn: '9780374533557', totalCopies: 4, availableCopies: 4, genreId: nonFiction.id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', totalCopies: 10, availableCopies: 10, genreId: fantasy.id },
    { title: 'Harry Potter and the Sorcerer's Stone', author: 'J.K. Rowling', isbn: '9780590353427', totalCopies: 12, availableCopies: 12, genreId: fantasy.id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', totalCopies: 6, availableCopies: 6, genreId: fantasy.id },
    { title: 'The Way of Kings', author: 'Brandon Sanderson', isbn: '9780765365279', totalCopies: 5, availableCopies: 5, genreId: fantasy.id },
  ];

  for (const book of books) {
    await prisma.book.create({ data: book });
  }

  const firstBook = await prisma.book.findFirst();
  if (firstBook) {
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Exceptional reading experience!',
        bookId: firstBook.id,
        userId: patron.id,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
