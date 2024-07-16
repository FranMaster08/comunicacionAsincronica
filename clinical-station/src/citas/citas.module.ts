import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { CitasGateway } from './citas.gateway';

@Module({
  imports: [CitasGateway],
  exports: [CitasGateway],
  controllers: [CitasController],
  providers: [CitasService, CitasGateway],
})
export class CitasModule {}
