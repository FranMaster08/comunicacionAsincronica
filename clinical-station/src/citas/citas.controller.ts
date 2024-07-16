import { Controller, Get } from '@nestjs/common';
import { CitasService } from './citas.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las citas' })
  @ApiResponse({ status: 200, description: 'Retorna todas las citas.' })
  findAll() {
    return this.citasService.findAll();
  }
}
