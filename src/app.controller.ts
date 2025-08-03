import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  register(@Body() user: User) {
    return this.appService.createUser(user);
  }

  @Post('login')
  login(@Body() { login, password }: { login: string; password: string }) {
    return this.appService.login(login, password);
  }

  @Get('profile/my')
  getProfile() {
    return this.appService.getProfile();
  }
}