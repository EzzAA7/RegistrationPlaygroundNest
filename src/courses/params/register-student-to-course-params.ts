import { IsMongoId } from 'class-validator';

export class RegisterStudentToCourseParams {
  @IsMongoId()
  id: string;
}
