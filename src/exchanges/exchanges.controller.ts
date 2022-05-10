import { Controller, Get, Param } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { EXCHANGES_BASE_PATH } from './exchanges.constants';

@Controller(EXCHANGES_BASE_PATH)
export class ExchangesController {
    constructor(
        private readonly exchangesService: ExchangesService
    ) {}

    @Get('/:entityBank')
    async getDataBankFamiliar(
        @Param('entityBank') entityBank: string
    ) {
        const bankFamiliar = await this.exchangesService.getAllExchangeQuotesByEntityBank(entityBank)
        return bankFamiliar
    }
}
