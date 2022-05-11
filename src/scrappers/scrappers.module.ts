import { Module } from '@nestjs/common'
import { ScrapperController } from './scrappers.controller'
import { CambiosChacoService, BancoFamiliarService } from '../services'
import { ExchangesModule } from '../exchanges/exchanges.module';
import { BancoVisionService } from '../services/bancoVision.service';
import { CambiosAlberdiService } from '../services/cambiosAlberdi.service';

@Module({
  imports: [
    ExchangesModule
  ],
  controllers: [ScrapperController],
  providers: [
    CambiosChacoService,
    CambiosAlberdiService,
    BancoFamiliarService,
    BancoVisionService,
  ]
})
export class ScrapperModule {}
