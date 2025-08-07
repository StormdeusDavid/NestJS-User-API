import { Controller, Post, Body, Get, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('login') login?: string
  ) {
    return this.appService.getUsers(page, limit, login);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.appService.updateUser(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(+id);
  }
}