import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  employeeCode: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  department: string;

  @IsString()
  designation: string;

  @IsNumber()
  salary: number;

  joiningDate: Date;

  @IsBoolean()
  isActive: boolean;
}
