import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UserDto {
  id: number;
  email: string;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: number;
  address?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  aboutMe?: string;
}

export class SignInUserDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpUserDto extends UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username:string;
}

export class Token {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
