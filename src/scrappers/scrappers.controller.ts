import { Controller, Get } from '@nestjs/common';
import { BancoFamiliarService, CambiosChacoService } from '../services';
import { ExchangesService } from '../services/exchanges.service';

@Controller('scrapper')
export class ScrapperController {

    constructor(
        private bancoFamiliarService: BancoFamiliarService,
        private cambiosChacoService: CambiosChacoService,
        private exchangesService: ExchangesService
    ) { }

    @Get('familiar')
    async scrapperBankFamiliar() {
        const bankFamiliar = await this.bancoFamiliarService.getExchangeData()
        await this.exchangesService.saveExchange(bankFamiliar)
        return 'Saved data'
    }

    @Get('familiar/get')
    async getDataBankFamiliar() {
        const bankFamiliar = await this.exchangesService.getAllExchangeQuotes()
        return bankFamiliar
    }

    @Get('cambios-chaco')
    async scrapperCambiosChaco() {
        return await this.cambiosChacoService.getExchangeData()
    }
}
