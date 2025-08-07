import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { User } from './entities/user.entity';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { 
      message: 'API is working',
      endpoints: {
        users: '/users',
        auth: '/auth'
      }
    };
  }
}
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
