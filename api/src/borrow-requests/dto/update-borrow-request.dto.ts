import { IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { BorrowStatus } from '@prisma/client';

export class UpdateBorrowRequestDto {
  @IsEnum(BorrowStatus)
  @IsOptional()
  status?: BorrowStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsDateString()
  @IsOptional()
  returnDate?: string;

  @IsNumber()
  @IsOptional()
  fineAmount?: number;
}
