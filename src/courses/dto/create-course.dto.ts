import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Student } from 'src/students/schemas/student.schema';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The name of the course',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  students: Student[];

  createdAt: Date;
}
