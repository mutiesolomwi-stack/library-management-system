import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);
  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@library.com',
      name: 'Head Librarian',
      password: hashedPassword,
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: 'patron@library.com',
      name: 'Jane Reader',
      password: hashedPassword,
      role: Role.PATRON,
    },
  });

  const genresData = [
    { name: 'Fiction', slug: 'fiction', description: 'Literary works of fiction' },
    { name: 'Science Fiction', slug: 'sci-fi', description: 'Futuristic and speculative fiction' },
    { name: 'Mystery & Thriller', slug: 'mystery', description: 'Suspenseful investigation stories' },
    { name: 'Non-Fiction', slug: 'non-fiction', description: 'Factual and educational works' },
    { name: 'Fantasy', slug: 'fantasy', description: 'Magical and mythical worlds' },
  ];

  const createdGenres = [];
  for (const g of genresData) {
    const genre = await prisma.genre.create({ data: g });
    createdGenres.push(genre);
  }

  const booksData = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', totalCopies: 5, genreId: createdGenres[0].id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', totalCopies: 4, genreId: createdGenres[0].id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', totalCopies: 6, genreId: createdGenres[1].id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', totalCopies: 3, genreId: createdGenres[1].id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569560', totalCopies: 2, genreId: createdGenres[1].id },
    { title: 'The Da Vinci Code', author: 'Dan Brown', isbn: '9780307474278', totalCopies: 4, genreId: createdGenres[2].id },
    { title: 'Gone Girl', author: 'Gillian Flynn', isbn: '9780307588371', totalCopies: 3, genreId: createdGenres[2].id },
    { title: 'Sherlock Holmes', author: 'Arthur Conan Doyle', isbn: '9780141040271', totalCopies: 5, genreId: createdGenres[2].id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', totalCopies: 7, genreId: createdGenres[3].id },
    { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', totalCopies: 4, genreId: createdGenres[3].id },
    { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', totalCopies: 8, genreId: createdGenres[3].id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', totalCopies: 6, genreId: createdGenres[4].id },
    { title: 'Harry Potter & The Sorcerer's Stone', author: 'J.K. Rowling', isbn: '9780590353427', totalCopies: 10, genreId: createdGenres[4].id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', isbn: '9780756404741', totalCopies: 3, genreId: createdGenres[4].id },
    { title: 'The Way of Kings', author: 'Brandon Sanderson', isbn: '9780765365279', totalCopies: 4, genreId: createdGenres[4].id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780141439518', totalCopies: 4, genreId: createdGenres[0].id },
  ];

  for (const b of booksData) {
    await prisma.book.create({ data: b });
  }

  console.log('Seed completed successfully!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
