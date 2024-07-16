import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCitaDto {
  @ApiProperty({
    description: 'Nombre de la cita',
    example: 'Consulta médica',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Edad relacionada con la cita',
    example: 30,
  })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @ApiProperty({
    description: 'Estado de la cita',
    example: 1,
  })
  @IsInt()
  status: number;
}
