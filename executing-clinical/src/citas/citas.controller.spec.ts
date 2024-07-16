import { Test, TestingModule } from '@nestjs/testing';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';

describe('CitasController', () => {
  let controller: CitasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitasController],
      providers: [CitasService],
    }).compile();

    controller = module.get<CitasController>(CitasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
