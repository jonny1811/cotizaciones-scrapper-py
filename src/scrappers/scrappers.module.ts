import { Module } from '@nestjs/common'
import { ScrapperController } from './scrappers.controller'
import { CambiosChacoService, BancoFamiliarService } from '../services'
import { ExchangesSchema } from '../schemas/exchanges.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangesService } from '../services/exchanges.service';
import { ExchangesRepository } from '../repositories/exchanges.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Exchanges', schema: ExchangesSchema }])
  ],
  controllers: [ScrapperController],
  providers: [
    CambiosChacoService,
    BancoFamiliarService,
    ExchangesService,
    ExchangesRepository
  ]
})
export class ScrapperModule {}
