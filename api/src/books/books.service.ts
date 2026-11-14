import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
      include: { genre: true },
    });
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
    } else {
      orderBy.title = 'asc';
    }

    const skip = (page - 1) * limit;
    const take = Number(limit);

    const [items, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take,
        orderBy,
        include: { genre: true },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
        reviews: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    });
    if (!book) {
      throw new NotFoundException();
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
      include: { genre: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id } });
  }
}
