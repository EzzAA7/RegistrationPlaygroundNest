import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all courses' })
  @ApiOkResponse({ status: 200, description: 'Found all courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a course' })
  @ApiParam({ name: 'id', description: 'Id of the course' })
  @ApiOkResponse({ status: 200, description: 'Found the course' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Register a student to course' })
  // @ApiParam({ name: 'id', description: 'Id of the course' })
  // @ApiOkResponse({ status: 200, description: 'Registered the student' })
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the course' })
  @ApiParam({ name: 'id', description: 'Id of the course' })
  @ApiOkResponse({ status: 200, description: 'Deleted the course' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
