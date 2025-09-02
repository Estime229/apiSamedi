import { Test, TestingModule } from '@nestjs/testing';
import { MemberRequestController } from './member-request.controller';

describe('MemberRequestController', () => {
  let controller: MemberRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberRequestController],
    }).compile();

    controller = module.get<MemberRequestController>(MemberRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
