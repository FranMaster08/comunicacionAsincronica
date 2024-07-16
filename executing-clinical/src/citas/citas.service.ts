import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citas } from '../shared/Citas.entity';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { CreateCitaDto } from './dto/create-cita.dto';
import { KafkaProducerService } from 'src/kafka-module/kafka.service';


@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Citas)
    private readonly citaRepository: Repository<Citas>,
    private readonly kafkaProducerService: KafkaProducerService, // Inyecta el servicio de Kafka
  ) {}

  async findAll(): Promise<Citas[]> {
    return this.citaRepository.find();
  }

  async findOne(id: number): Promise<Citas> {
    return this.citaRepository.findOne({
      where: {
        idcitas: id,
      },
    });
  }

  async create(cita: CreateCitaDto): Promise<Citas> {
    const newCita = this.citaRepository.create(cita);
    const savedCita = await this.citaRepository.save(newCita);
    await this.kafkaProducerService.sendMessage('citas', { action: 'create', cita: savedCita });
    return savedCita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto): Promise<Citas> {
    await this.citaRepository.update(id, updateCitaDto);
    const updatedCita = await this.findOne(id);
    await this.kafkaProducerService.sendMessage('citas', { action: 'update', cita: updatedCita });
    return updatedCita;
  }

  async remove(id: number): Promise<void> {
    const citaToDelete = await this.findOne(id);
    await this.citaRepository.delete(id);
    await this.kafkaProducerService.sendMessage('citas', { action: 'delete', cita: citaToDelete });
  }
}
