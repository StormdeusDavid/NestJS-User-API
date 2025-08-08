import { Controller, Get, Post, Put, Delete, Body, Query, UseGuards, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { login, email, password, age, description } = body;
    
    // Проверяем, существует ли пользователь
    const existingUser = await this.userRepository.findOne({
      where: [{ login }, { email }]
    });
    
    if (existingUser) {
      return { message: 'User with this login or email already exists' };
    }
    
    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User();
    user.login = login;
    user.email = email;
    user.password = hashedPassword;
    user.age = age;
    user.about = description;
    
    const savedUser = await this.userRepository.save(user);
    return { id: savedUser.id, message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: any) {
    const { login, password } = body;
    
    // Находим пользователя
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    
    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: 'Invalid credentials' };
    }
    
    // В реальном приложении здесь должен быть JWT токен
    return { 
      message: 'Login successful', 
      userId: user.id,
      login: user.login
    };
  }

  @Get('profile/my')
  async getProfile() {
    // Пока возвращаем всех пользователей для теста
    const users = await this.userRepository.find();
    return users[0];
  }

  @Put('profile/my')
  async updateProfile(@Body() body: any) {
    // Логика обновления профиля (пока заглушка)
    return { message: 'Profile updated successfully' };
  }

  @Delete('profile/my')
  async deleteProfile() {
    // Логика удаления профиля (пока заглушка)
    return { message: 'Profile deleted successfully' };
  }

  @Get('users')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('login') login: string
  ) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    
    if (login) {
      queryBuilder.where('user.login ILIKE :login', { login: `%${login}%` });
    }
    
    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    
    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
}