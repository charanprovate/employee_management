import { Controller, Delete, Put } from '@nestjs/common';
import { Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id', ParseIntPipe) id: number) {
    const employee = this.employeeService.getEmployeeById(id);

    return employee;
  }

  @Post()
  createEmployee(@Body() employeeData: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeData);
  }

  @Post('bulk')
  createEmployeesBulk(@Body() employeesData: CreateEmployeeDto[]) {
    return this.employeeService.createEmployeesBulk(employeesData);
  }

  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employeeData: CreateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, employeeData);
  }

  @Delete(':id')
  deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    this.employeeService.deleteEmployee(id);
    return { message: 'Employee deleted successfully' };
  }
}
