import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, // Добавляем JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { login, email, password, age, description } = registerDto;
    
    const existingUser = await this.userRepository.findOne({
      where: [{ login }, { email }]
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким логином или email уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      login,
      email,
      password: hashedPassword,
      age,
      about: description
    });

    const savedUser = await this.userRepository.save(user);
    
    const payload = { userId: savedUser.id, login: savedUser.login };
    const token = this.jwtService.sign(payload);
    
    return { 
      user: savedUser,
      token 
    };
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { login } });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}