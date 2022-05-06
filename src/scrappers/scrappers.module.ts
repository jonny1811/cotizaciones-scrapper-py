import { Module } from '@nestjs/common';
import { ScrapperController } from './scrappers.controller';
import { CambiosChacoService, BancoFamiliarService } from '../services';

@Module({
  controllers: [ScrapperController],
  providers: [
    CambiosChacoService,
    BancoFamiliarService,
  ]
})
export class ScrapperModule {}
