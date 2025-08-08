import { Test } from '@nestjs/testing';
import { AppController } from './auth/app.controller';
import { AuthModule } from './auth/auth.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AppController],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API status', () => {
      expect(appController.getHello()).toEqual({
        status: 'API is working',
        endpoints: {
          auth: '/auth',
          profile: '/profile'
        }
      });
    });
  });
});