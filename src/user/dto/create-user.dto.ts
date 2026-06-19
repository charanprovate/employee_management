import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'charan',
    description: 'Username for login',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for login',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'Role of the user',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
