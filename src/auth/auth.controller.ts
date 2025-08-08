import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'nestjs',
  host: 'localhost',
  database: 'nestjs_db',
  password: 'nestjs',
  port: 5432,
});

@Controller('auth')
export class AuthController {
  @Get('profile/my')
  async getProfile() {
    const res = await pool.query('SELECT * FROM users LIMIT 1');
    return res.rows[0];
  }

  @Post('register')
  async register(@Body() body: any) {
    const { login, email, password, age, description } = body;
    const res = await pool.query(
      'INSERT INTO users(login, email, password, age, description) VALUES($1, $2, $3, $4, $5) RETURNING id',
      [login, email, password, age, description]
    );
    return { id: res.rows[0].id };
  }
}