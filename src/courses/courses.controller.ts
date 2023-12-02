import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { RegisterStudentToCourseDto } from './dto/register-student-to-course-dto';
import { Course } from './schemas/course.schema';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create course' })
  @ApiCreatedResponse({
    description: 'The course has been successfully created.',
    type: Course,
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    createCourseDto.createdAt = new Date();
    createCourseDto.students = [];

    try {
      return this.coursesService.create(createCourseDto);
    } catch (error) {
      throw new BadRequestException('Failed trying to add the course.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find all courses' })
  @ApiOkResponse({ status: 200, description: 'Found all courses' })
  findAll() {
    try {
      return this.coursesService.findAll();
    } catch (error) {
      throw new BadRequestException('Failed when trying to find the courses.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a course' })
  @ApiParam({ name: 'id', description: 'Id of the course' })
  @ApiOkResponse({ status: 200, description: 'Found the course' })
  findOne(@Param('id') id: string) {
    try {
      return this.coursesService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Failed when trying to find the course.');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Register a student to course' })
  @ApiParam({ name: 'id', description: 'Id of the course' })
  @ApiOkResponse({ status: 200, description: 'Registered the student' })
  registerStudent(
    @Param('id') id: string,
    @Body() updateCourseDto: RegisterStudentToCourseDto
  ) {
    try {
      return this.coursesService.registerStudent(id, updateCourseDto);
    } catch (error) {
      throw new BadRequestException(
        'Failed when trying to register the student to course, please provide a correct course & student.'
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the course' })
  @ApiParam({ name: 'id', description: 'Id of the course' })
  @ApiOkResponse({ status: 200, description: 'Deleted the course' })
  remove(@Param('id') id: string) {
    try {
      return this.coursesService.remove(id);
    } catch (error) {
      throw new BadRequestException('Failed while trying to remove the course');
    }
  }
}
