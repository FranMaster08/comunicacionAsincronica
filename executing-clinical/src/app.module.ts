import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka-module/kafka-module.module';
import { KafkaController } from './kafka-module/kafka.controller';
import { KafkaProducerService } from './kafka-module/kafka.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'mysql',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'citas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // No usar en producción, puede llevar a la pérdida de datos
    }),
    CitasModule,
  ],
  controllers: [AppController, KafkaController],
  providers: [AppService, KafkaProducerService],
})
export class AppModule {}
