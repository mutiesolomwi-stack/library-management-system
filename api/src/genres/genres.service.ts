import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    const slug = createGenreDto.slug || createGenreDto.name.toLowerCase().replace(/\s+/g, '-');
    
    const existing = await this.prisma.genre.findFirst({
      where: { OR: [{ name: createGenreDto.name }, { slug }] },
    });

    if (existing) {
      throw new ConflictException('Genre with this name or slug already exists');
    }

    return this.prisma.genre.create({
      data: { name: createGenreDto.name, slug },
    });
  }

  async findAll() {
    return this.prisma.genre.findMany({
      include: {
        _count: { select: { books: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }

    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);
    const data: any = { ...updateGenreDto };
    if (updateGenreDto.name && !updateGenreDto.slug) {
      data.slug = updateGenreDto.name.toLowerCase().replace(/\s+/g, '-');
    }

    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.genre.delete({ where: { id } });
  }
}
