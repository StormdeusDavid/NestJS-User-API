import { IsEmail, IsOptional, Length, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Length(3, 20)
  login?: string;

  @IsOptional()
  @Min(12)
  age?: number;

  @IsOptional()
  @Length(1, 1000)
  about?: string;
}