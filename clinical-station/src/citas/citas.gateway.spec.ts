import { Test, TestingModule } from '@nestjs/testing';
import { CitasGateway } from './citas.gateway';

describe('CitasGateway', () => {
  let gateway: CitasGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitasGateway],
    }).compile();

    gateway = module.get<CitasGateway>(CitasGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
