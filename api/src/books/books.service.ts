import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        availableCopies: createBookDto.totalCopies,
      },
    });
  }

  async findAll(genreId?: number, search?: string, page = 1, limit = 10, sortBy?: string) {
    const where: any = {};
    if (genreId) where.genreId = Number(genreId);
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }
    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'title') orderBy = { title: 'asc' };
    if (sortBy === 'author') orderBy = { author: 'asc' };

    const [items, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: Number(limit),
        include: { genre: true },
        orderBy,
      }),
      this.prisma.book.count({ where }),
    ]);

    return { items, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true, reviews: { include: { user: { select: { name: true } } } } },
    });
    if (!book) throw new NotFoundException(`Book #${id} not found`);
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
