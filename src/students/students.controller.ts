import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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

    try {
      return this.studentsService.create(createStudentDto);
    } catch (error) {
      throw new BadRequestException('Failed trying to add the student.');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Find all students' })
  @ApiOkResponse({ status: 200, description: 'Found all students' })
  findAll() {
    try {
      return this.studentsService.findAll();
    } catch (error) {
      throw new BadRequestException('Failed when trying to find the students.');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a student' })
  @ApiParam({ name: 'id', description: 'Id of the student' })
  @ApiOkResponse({ status: 200, description: 'Found the student' })
  findOne(@Param('id') id: string) {
    try {
      return this.studentsService.findOne(id);
    } catch (error) {
      throw new NotFoundException('Failed when trying to find the student.');
    }
  }
}
