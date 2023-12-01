import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Student } from './schemas/student.schema';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiCreatedResponse({
    description: 'The student has been successfully created.',
    type: Student,
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    createStudentDto.createdAt = new Date();
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all students' })
  @ApiOkResponse({ status: 200, description: 'Found all students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a student' })
  @ApiParam({ name: 'id', description: 'Id of the student' })
  @ApiOkResponse({ status: 200, description: 'Found the student' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }
}
