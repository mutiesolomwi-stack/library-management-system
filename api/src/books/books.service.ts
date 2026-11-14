import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto, include: { genre: true } });
  }

  async findAll(genreId?: string, search?: string, page: number = 1, limit: number = 10, sortBy?: string) {
    const where: any = {};

    if (genreId) {
      where.genreId = genreId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {};
    if (sortBy === 'author') {
      orderBy.author = 'asc';
    } else if (sortBy === 'title') {
      orderBy.title = 'asc';
    } else {
      orderBy.createdAt = 'desc';
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        include: { genre: true },
        orderBy,
        skip,
        take: Number(limit),
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true, reviews: { include: { user: { select: { id: true, name: true } } } } },
    });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({ where: { id }, data: dto, include: { genre: true } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
}
