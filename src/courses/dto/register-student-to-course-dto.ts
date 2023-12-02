import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/students/schemas/student.schema';

export class RegisterStudentToCourseDto {
  @ApiProperty({
    description: 'The id of the student you want to register',
  })
  studentId: string;
  students: Student[];
}
