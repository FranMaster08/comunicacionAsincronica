import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('citas')
@Controller('citas')
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva cita' })
  @ApiResponse({ status: 201, description: 'La cita ha sido creada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citasService.create(createCitaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las citas' })
  @ApiResponse({ status: 200, description: 'Retorna todas las citas.' })
  findAll() {
    return this.citasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna la cita con el ID proporcionado.',
  })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.citasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una cita' })
  @ApiResponse({ status: 200, description: 'La cita ha sido actualizada.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  update(@Param('id') id: string, @Body() updateCitaDto: UpdateCitaDto) {
    return this.citasService.update(+id, updateCitaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cita' })
  @ApiResponse({ status: 200, description: 'La cita ha sido eliminada.' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada.' })
  remove(@Param('id') id: string) {
    return this.citasService.remove(+id);
  }
}
