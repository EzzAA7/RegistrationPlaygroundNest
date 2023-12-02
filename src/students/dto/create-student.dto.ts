import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'The first name of a student',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of a student',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  createdAt: Date;
}
