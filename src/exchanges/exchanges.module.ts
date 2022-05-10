import { Module } from '@nestjs/common';
import { ExchangesController } from './exchanges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EXCHANGES_MODEL_NAME } from './exchanges.constants';
import { ExchangesSchema } from './model/exchanges.model';
import { ExchangesService } from './exchanges.service';
import { ExchangesRepository } from './exchanges.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EXCHANGES_MODEL_NAME,
        schema: ExchangesSchema
      }
    ])
  ],
  controllers: [ExchangesController],
  providers: [
    ExchangesService,
    ExchangesRepository
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: EXCHANGES_MODEL_NAME,
        schema: ExchangesSchema
      }
    ]),
    ExchangesService,
    ExchangesRepository
  ]
})
export class ExchangesModule {}
