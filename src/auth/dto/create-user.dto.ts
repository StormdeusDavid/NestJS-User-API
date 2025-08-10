// src/auth/dto/create-user.dto.ts
export class CreateUserDto {
  login: string;
  email: string;
  password: string;
  age: number;
  about: string;
}