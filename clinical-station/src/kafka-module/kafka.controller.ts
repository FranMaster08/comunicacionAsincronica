import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CitasGateway } from 'src/citas/citas.gateway';

@Controller()
export class KafkaController {
  constructor(private readonly citasGateway: CitasGateway) {}

  @EventPattern('citas')
  async handleMessage(@Payload() message) {
    console.log('Received message ms-atencion-citas:', message);
    this.citasGateway.emitCitasChanges(message);
  }
}
