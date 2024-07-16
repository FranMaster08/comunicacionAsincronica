import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka-module/kafka-module.module';
import { KafkaController } from './kafka-module/kafka.controller';
import { KafkaProducerService } from './kafka-module/kafka.service';
import { CitasModule } from './citas/citas.module';
import { CitasGateway } from './citas/citas.gateway';

@Module({
  imports: [KafkaModule, CitasModule, CitasGateway],
  controllers: [AppController, KafkaController],
  providers: [AppService, KafkaProducerService, CitasGateway],
})
export class AppModule {}
