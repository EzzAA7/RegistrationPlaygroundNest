import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/students/schemas/student.schema';

export class CreateCourseDto {
  @ApiProperty({
    description: 'The name of the course',
  })
  name: string;

  students: Student[];

  createdAt: Date;
}
