import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookingDto) {
    const space = await this.prisma.space.findUnique({ where: { id: dto.spaceId } });
    if (!space) {
      throw new NotFoundException(`Space #${dto.spaceId} not found`);
    }

    const conflict = await this.prisma.booking.findFirst({
      where: {
        spaceId: dto.spaceId,
        date: dto.date,
        status: BookingStatus.CONFIRMED,
        startTime: { lt: dto.endTime },
        endTime: { gt: dto.startTime },
      },
    });

    if (conflict) {
      throw new ConflictException('This space is already booked for that time window.');
    }

    return this.prisma.booking.create({
      data: {
        userId,
        spaceId: dto.spaceId,
        date: dto.date,
        startTime: dto.startTime,
        endTime: dto.endTime,
        status: BookingStatus.CONFIRMED,
      },
      include: { space: true },
    });
  }

  async findAll(user: any) {
    if (user.role === 'LIBRARIAN') {
      return this.prisma.booking.findMany({
        include: { user: { select: { id: true, name: true, email: true } }, space: true },
        orderBy: { date: 'asc' },
      });
    }
    return this.prisma.booking.findMany({
      where: { userId: user.userId },
      include: { space: true },
      orderBy: { date: 'asc' },
    });
  }

  async findAllSpaces() {
    return this.prisma.space.findMany();
  }
}
