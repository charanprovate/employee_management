import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entities';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(employeeData: CreateEmployeeDto) {
    return await this.employeeRepository.save(employeeData);
  }

  async createEmployeesBulk(employeesData: CreateEmployeeDto[]) {
    return await this.employeeRepository.save(employeesData);
  }

  async getAllEmployees(
    page?: string,
    limit?: string,
    department?: string,
    designation?: string,
  ) {
    const skip = Number(page) ? (Number(page) - 1) * Number(limit || 10) : 0;
    const take = Number(limit) || 10;

    const findOptions: any = { skip, take };

    if (department) {
      findOptions.where = { ...findOptions.where, department };
    }

    if (designation) {
      findOptions.where = { ...findOptions.where, designation };
    }

    return await this.employeeRepository.find(findOptions);
  }

  async getEmployeeById(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async updateEmployee(id: number, employeeData: CreateEmployeeDto) {
    const employee = await this.getEmployeeById(id);

    Object.assign(employee, employeeData);

    return await this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number) {
    await this.getEmployeeById(id);

    await this.employeeRepository.delete(id);

    return {
      message: 'Employee deleted successfully',
    };
  }
}
