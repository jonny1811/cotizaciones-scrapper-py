import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios';
import { ScrapperController } from './scrappers.controller'
import { CambiosChacoService, BancoFamiliarService } from '../services'
import { ExchangesModule } from '../exchanges/exchanges.module';
import { BancoVisionService } from '../services/bancoVision.service';
import { CambiosAlberdiService } from '../services/cambiosAlberdi.service';
import { BancoContinentalService } from '../services/bancoContinental.service';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
	HttpModule,
    ExchangesModule,
	PlaceModule
  ],
  controllers: [ScrapperController],
  providers: [
    CambiosChacoService,
    CambiosAlberdiService,
    BancoFamiliarService,
    BancoVisionService,
    BancoContinentalService
  ]
})
export class ScrapperModule {}
