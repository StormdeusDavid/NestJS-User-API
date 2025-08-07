import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AppController } from './app.controller';
import { ProfileController } from './profile.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AppController, ProfileController],
  providers: [AuthService],
})
export class AuthModule {}