import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './interfaces/employee.interface';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];
  private idCounter = 1;

  createEmployee(employeeData: CreateEmployeeDto) {
    const newEmployee = {
      id: this.idCounter++,
      ...employeeData,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  createEmployeesBulk(employeesData: CreateEmployeeDto[]) {
    const newEmployees = employeesData.map((employeeData) => {
      const newEmployee = {
        id: this.idCounter++,
        ...employeeData,
      };
      this.employees.push(newEmployee);
      return newEmployee;
    });
    return newEmployees;
  }

  getEmployeeById(id: number) {
    const employee = this.getAllEmployees().find((emp) => emp.id === id);

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  updateEmployee(id: number, employeeData: CreateEmployeeDto) {
    const employee = this.getEmployeeById(id);
    Object.assign(employee, employeeData);
    return employee;
  }

  getAllEmployees() {
    return this.employees;
  }

  deleteEmployee(id: number) {
    const employeeIndex = this.getAllEmployees().findIndex(
      (emp) => emp.id === id,
    );

    if (employeeIndex === -1) {
      throw new NotFoundException('Employee not found');
    }
    return this.employees.splice(employeeIndex, 1)[0];
  }
}
