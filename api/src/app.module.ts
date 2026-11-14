import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GenresModule } from './genres/genres.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BorrowRequestsModule } from './borrow-requests/borrow-requests.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    PrismaModule,
    GenresModule,
    BooksModule,
    AuthModule,
    UsersModule,
    BorrowRequestsModule,
    BookingsModule,
  ],
})
export class AppModule {}
