import { IsEmail, IsString, Length, Min } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @Min(12)
  age: number;

  @IsString()        
  @Length(1, 1000)   
  description: string; 
}