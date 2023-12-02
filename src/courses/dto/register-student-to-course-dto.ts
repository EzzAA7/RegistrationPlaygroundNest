import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Student } from 'src/students/schemas/student.schema';

export class RegisterStudentToCourseDto {
  @ApiProperty({
    description: 'The id of the student you want to register',
  })
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;

  students: Student[];
}
