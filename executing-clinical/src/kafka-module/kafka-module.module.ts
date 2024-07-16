import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaController } from './kafka.controller';
import { KafkaProducerService } from './kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          subscribe: {
            fromBeginning: true,
          },
          client: {
            brokers: ['kafka:9092'],
            clientId: 'my-client-id',
          },
          consumer: {
            groupId: 'my-group-id',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService, ClientsModule],
})
export class KafkaModule {}
