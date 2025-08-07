import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('register')
  async register(@Body() userData: {
    login: string;
    email: string;
    password: string;
    age: number;
    description: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    return { id: user.id, login: user.login };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/my')
  async getProfile(@Req() req) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
    });
    const { password, ...result } = user;
    return result;
  }
}
