import { PartialType } from '@nestjs/mapped-types';
import { CreateCitaDto } from './create-cita.dto';

export class UpdateCitaDto extends PartialType(CreateCitaDto) {}
