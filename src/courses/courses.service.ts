import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  create(createCourseDto: CreateCourseDto) {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    return this.courseModel.findOne({ _id: id }).exec();
  }

  // async update(
  //   id: string,
  //   updatePersonalTaskDto: UpdatePersonalTaskDto
  // ): Promise<Course> {
  //   const deletedPersonalTask = await this.courseModel
  //     .findByIdAndUpdate({ _id: id }, updatePersonalTaskDto, { new: true })
  //     .exec();
  //   return deletedPersonalTask;
  // }

  async remove(id: string) {
    const deletedPersonalTask = await this.courseModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedPersonalTask;
  }
}
