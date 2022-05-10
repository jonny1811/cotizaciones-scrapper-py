import { Controller, Post } from '@nestjs/common';
import { BancoFamiliarService, CambiosChacoService } from '../services';
import { ExchangesService } from '../exchanges/exchanges.service';
import { SCRAPPERS_BASE_PATH } from './scrappers.constants';

@Controller(SCRAPPERS_BASE_PATH)
export class ScrapperController {

    constructor(
        private bancoFamiliarService: BancoFamiliarService,
        private cambiosChacoService: CambiosChacoService,
        private exchangesService: ExchangesService
    ) {}

    @Post('familiar')
    async scrapperBankFamiliar() {
        const bankFamiliar = await this.bancoFamiliarService.getExchangeData()
        await this.exchangesService.saveExchange(bankFamiliar)
        return {
            entityBank: 'Banco Familiar',
            status: 200
        }
    }

    @Post('cambios-chaco')
    async scrapperCambiosChaco() {
        const cambiosChaco = await this.cambiosChacoService.getExchangeData()
        await this.exchangesService.saveExchange(cambiosChaco)
        return {
            entityBank: 'Cambios Chaco',
            status: 200
        }
    }
}
