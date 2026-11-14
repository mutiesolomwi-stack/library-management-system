import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBorrowRequestDto {
  @IsInt()
  @IsNotEmpty()
  bookId: number;
}
