import { Module } from '@nestjs/common'
import { ScrapperController } from './scrappers.controller'
import { CambiosChacoService, BancoFamiliarService } from '../services'
import { ExchangesModule } from '../exchanges/exchanges.module';

@Module({
  imports: [
    ExchangesModule
  ],
  controllers: [ScrapperController],
  providers: [
    CambiosChacoService,
    BancoFamiliarService
  ]
})
export class ScrapperModule {}
