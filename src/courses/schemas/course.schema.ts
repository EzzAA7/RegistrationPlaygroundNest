import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/students/schemas/student.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  @ApiProperty({
    description: 'The name of a course',
  })
  name: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'An array of students registered to this course',
  })
  @Prop()
  students: Student[];

  @Prop()
  lastModifiedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
