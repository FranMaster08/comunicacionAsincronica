import { Controller, Post, Body } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.service';

@Controller()
export class KafkaController {
  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  @EventPattern('citas')
  async handleMessage(@Payload() message) {
    console.log('Received message ms-gestion-citas:', message);
    // Aquí puedes manejar el mensaje recibido
  }

  @Post('send')
  async sendMessage(@Body('message') message: any) {
    await this.kafkaProducerService.sendMessage('citas', message);
    return 'Message sent';
  }
}
