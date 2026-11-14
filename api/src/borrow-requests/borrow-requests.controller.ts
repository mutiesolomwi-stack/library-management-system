import { Controller, Get, Post, Patch, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { BorrowRequestsService } from './borrow-requests.service';
import { CreateBorrowRequestDto } from './dto/create-borrow-request.dto';
import { UpdateBorrowRequestDto } from './dto/update-borrow-request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('borrow-requests')
@UseGuards(JwtAuthGuard)
export class BorrowRequestsController {
  constructor(private readonly borrowRequestsService: BorrowRequestsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateBorrowRequestDto) {
    return this.borrowRequestsService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Req() req) {
    return this.borrowRequestsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.borrowRequestsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('LIBRARIAN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBorrowRequestDto,
  ) {
    return this.borrowRequestsService.update(id, dto);
  }
}
