import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeCode: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  department: string;

  @Column()
  designation: string;

  @Column()
  salary: number;

  @Column()
  joiningDate: Date;

  @Column()
  isActive: boolean;
}
