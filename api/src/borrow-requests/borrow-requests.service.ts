import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
import { UpdateBorrowRequestDto } from './dto/update-borrow-request.dto';
import { calculateFine } from './fine-calculator';
import { BorrowStatus } from '@prisma/client';

@Injectable()
export class BorrowRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBorrowRequestDto) {
    const book = await this.prisma.book.findUnique({ where: { id: dto.bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${dto.bookId} not found`);
    }

    if (book.availableCopies < 1) {
      throw new BadRequestException('No copies currently available for borrow');
    }

    return this.prisma.borrowRequest.create({
      data: {
        userId,
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        status: BorrowStatus.REQUESTED,
      },
    });
  }

  async findAll(user: any) {
    if (user.role === 'LIBRARIAN') {
      return this.prisma.borrowRequest.findMany({
        include: { user: { select: { id: true, name: true, email: true } }, book: true },
        orderBy: { requestDate: 'desc' },
      });
    }
    return this.prisma.borrowRequest.findMany({
      where: { userId: user.userId },
      include: { book: true },
      orderBy: { requestDate: 'desc' },
    });
  }

  async findOne(id: number) {
    const req = await this.prisma.borrowRequest.findUnique({
      where: { id },
      include: { user: true, book: true },
    });
    if (!req) throw new NotFoundException(`Borrow request #${id} not found`);
    return req;
  }

  async update(id: number, dto: UpdateBorrowRequestDto) {
    const request = await this.prisma.borrowRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Borrow request #${id} not found`);
    }

    let fineAmount = request.fineAmount;
    let returnDate = dto.returnDate ? new Date(dto.returnDate) : request.returnDate;
    let dueDate = dto.dueDate ? new Date(dto.dueDate) : request.dueDate;

    if (dto.status === BorrowStatus.APPROVED && !dueDate) {
      const twoWeeks = new Date();
      twoWeeks.setDate(twoWeeks.getDate() + 14);
      dueDate = twoWeeks;
    }

    if (dto.status === BorrowStatus.RETURNED || dto.returnDate) {
      returnDate = returnDate || new Date();
      if (dueDate) {
        fineAmount = calculateFine(dueDate, returnDate, 10);
      }
    }

    return this.prisma.borrowRequest.update({
      where: { id },
      data: {
        status: dto.status || request.status,
        dueDate,
        returnDate,
        fineAmount,
      },
    });
  }
}
