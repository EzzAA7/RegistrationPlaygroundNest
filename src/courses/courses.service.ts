import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/students/schemas/student.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { RegisterStudentToCourseDto } from './dto/register-student-to-course-dto';
import { Course } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Student.name) private studentModel: Model<Student>
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const foundCourse = await this.courseModel.findOne({ _id: id }).exec();
    if (!foundCourse) {
      throw new NotFoundException('Course does not exist.');
    }

    return foundCourse;
  }

  async registerStudent(
    courseId: string,
    registerStudentToCourseDto: RegisterStudentToCourseDto
  ): Promise<Course> {
    const newStudent = await this.getNewStudent(registerStudentToCourseDto);
    const courseStudents: Student[] = await this.getCourseStudents(courseId);

    courseStudents.push(newStudent);
    registerStudentToCourseDto.students = courseStudents;

    return await this.courseModel
      .findByIdAndUpdate({ _id: courseId }, registerStudentToCourseDto, {
        new: true,
      })
      .exec();
  }

  private async getCourseStudents(id: string) {
    const foundCourse = await this.courseModel.findOne({ _id: id }).exec();
    if (!foundCourse) {
      throw new NotFoundException('Course does not exist.');
    }

    const courseStudents = foundCourse.students;
    return courseStudents;
  }

  private async getNewStudent(
    registerStudentToCourseDto: RegisterStudentToCourseDto
  ) {
    const newStudent = await this.studentModel
      .findOne({ _id: registerStudentToCourseDto.studentId })
      .exec();

    if (!newStudent) {
      throw new NotFoundException('Student does not exist.');
    }
    return newStudent;
  }

  async remove(id: string) {
    const deletedCourse = await this.courseModel
      .findByIdAndDelete({ _id: id })
      .exec();

    if (!deletedCourse) {
      throw new NotFoundException('Course does not exist.');
    }
    return deletedCourse;
  }
}
