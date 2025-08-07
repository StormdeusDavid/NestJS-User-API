import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto'; // Добавленный импорт

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: Omit<User, 'id'>): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async login(dto: { login: string; password: string }) {
    const user = await this.userRepository.findOne({
      where: { login: dto.login },
      select: ['id', 'login', 'password', 'email', 'age']
    });

    if (!user) throw new UnauthorizedException('Неверный логин');
    
    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Неверный пароль');

    const payload = { sub: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user, password: undefined }
    };
  }

  async getUsers(page: number = 1, limit: number = 10, login?: string) {
    const skip = (page - 1) * limit;
    const query = this.userRepository.createQueryBuilder('user');

    if (login) {
      query.where('user.login LIKE :login', { login: `%${login}%` });
    }

    const [users, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: users,
      meta: { page, limit, total }
    };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(id, dto);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: number) {
    const deleteResult = await this.userRepository.delete(id);
    return { deleted: (deleteResult.affected || 0) > 0 }; // Исправленная строка
  }
}