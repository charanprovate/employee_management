import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'EMP001',
    description: 'Unique code for the employee',
  })
  @IsString()
  @IsNotEmpty()
  employeeCode: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the employee',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the employee',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the employee',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the employee',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'Engineering',
    description: 'Department to which the employee belongs',
  })
  @IsString()
  department: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'Designation of the employee',
  })
  @IsString()
  designation: string;

  @ApiProperty({
    example: 75000,
    description: 'Salary of the employee',
  })
  @IsNumber()
  salary: number;

  @ApiProperty({
    example: '2023-01-15',
    description: 'Date when the employee joined',
  })
  joiningDate: Date;

  @ApiProperty({
    example: true,
    description: 'Indicates if the employee is active',
  })
  @IsBoolean()
  isActive: boolean;
}
