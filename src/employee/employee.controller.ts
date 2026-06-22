import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

// TODO: add auth guard with jwt strategy and role based access control
@ApiTags('Employee')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployees(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('department') department?: string,
    @Query('designation') designation?: string,
  ) {
    return this.employeeService.getAllEmployees(
      page,
      limit,
      department,
      designation,
    );
  }

  @Get(':id')
  async getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.getEmployeeById(id);
  }

  @Roles('admin', 'admin-jr')
  @Post()
  @UseGuards(RolesGuard)
  async createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return await this.employeeService.createEmployee(employeeData);
  }

  @Roles('admin', 'admin-jr')
  @Post('bulk')
  @UseGuards(RolesGuard)
  async createEmployeesBulk(@Body() employeesData: CreateEmployeeDto[]) {
    return await this.employeeService.createEmployeesBulk(employeesData);
  }

  @Roles('admin', 'admin-jr')
  @Put(':id')
  @UseGuards(RolesGuard)
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employeeData: CreateEmployeeDto,
  ) {
    return await this.employeeService.updateEmployee(id, employeeData);
  }

  @Roles('admin')
  @Delete(':id')
  @UseGuards(RolesGuard)
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.deleteEmployee(id);
  }
}
