import { Controller, Get, Param } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { EXCHANGES_BASE_PATH } from './exchanges.constants';

@Controller(EXCHANGES_BASE_PATH)
export class ExchangesController {
    constructor(
        private readonly exchangesService: ExchangesService
    ) {}

    @Get('/:entityBank')
    async getMarketRatesByEntityBank(
        @Param('entityBank') entityBank: string
    ) {
        const marketRate = await this.exchangesService.getMarketRatesByEntityBank(entityBank)
        return marketRate
    }

    @Get('entity/:entityBank/date/:date')
    async getMarketRatesByParams(
        @Param('entityBank') entityBank: string,
        @Param('date') date: string
    ) {
        const marketRateFinded = await this.exchangesService.obtainMarketRatesByParams({ entityBank, date })
        return marketRateFinded
    }
}
