import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citas } from '../shared/Citas.entity';
import { KafkaProducerService } from 'src/kafka-module/kafka.service';
import { KafkaModule } from 'src/kafka-module/kafka-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([Citas]),KafkaModule],
  controllers: [CitasController],
  providers: [CitasService, KafkaProducerService],
})
export class CitasModule {}
