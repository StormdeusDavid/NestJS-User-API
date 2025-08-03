import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async login(login: string, password: string): Promise<{ success: boolean }> {
    const user = await this.userRepository.findOne({ 
      where: { login } as any // Временное решение для новых версий TypeORM
    });
    return { 
      success: !!user && (user as User).password === password 
    };
  }

  async getProfile(): Promise<User[]> {
    return this.userRepository.find();
  }
}