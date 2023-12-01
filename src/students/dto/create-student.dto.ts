import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    description: 'The first name of a student',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of a student',
  })
  lastName: string;

  createdAt: Date;
}
