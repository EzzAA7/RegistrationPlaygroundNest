import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true })
  @ApiProperty({
    description: 'The first name of a student',
  })
  firstName: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'The last name of a student',
  })
  lastName: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  lastModifiedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
