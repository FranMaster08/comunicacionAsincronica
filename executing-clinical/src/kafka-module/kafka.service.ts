import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {
    console.log('KAFKA_SERVICE injected:', !!this.kafkaClient);
  }

  async onModuleInit() {
    // console.log('Iniciado');
    await this.kafkaClient.connect();
  }

  async sendMessage(topic: string, message: any) {
    console.log('Emitiendo');

    return this.kafkaClient.emit(topic, message);
  }
}
