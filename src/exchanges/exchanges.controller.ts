import { Controller, Get, Param, Query } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { EXCHANGES_BASE_PATH } from './exchanges.constants';
import { MarketRatesQueryDTO } from './dto/market-rates.query.dto';

@Controller(EXCHANGES_BASE_PATH)
export class ExchangesController {
    constructor(
        private readonly exchangesService: ExchangesService
    ) {}

    @Get('/all')
    async getAllMarketsRates(
        @Query() marketRatesQueryDTO: MarketRatesQueryDTO
    ) {
        const marketRate = await this.exchangesService.getAllMarketsRates(marketRatesQueryDTO)
        return marketRate
    }

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
        const marketRateFinded = await this.exchangesService.getMarketRatesByParams({ entityBank, date })
        return marketRateFinded
    }
}
