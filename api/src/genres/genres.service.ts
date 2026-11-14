import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({ data: createGenreDto });
  }

  findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundException(`Genre #${id} not found`);
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({ where: { id }, data: updateGenreDto });
  }

  remove(id: number) {
    return this.prisma.genre.delete({ where: { id } });
  }
}
